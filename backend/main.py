from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
import whisper
import tempfile
from transformers import pipeline
from db import Base, engine, SessionLocal, get_db
from models import JournalEntry

# create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load Whisper model once
model = whisper.load_model("base")

# HuggingFace pipelines
emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

topic_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

candidate_labels = [
    "health", "family", "work", "productivity", "finance",
    "self-care", "relationships", "creativity", "mental health", "friendship"
]


# routes

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        result = model.transcribe(tmp_path)
        transcript = result["text"]

        return {"transcript": transcript}
    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}


class TextRequest(BaseModel):
    text: str
    user_id: str


@app.post("/analyze")
def analyze_text(payload: TextRequest, db: Session = Depends(get_db)):
    text = payload.text

    # emotion detection
    emotion_scores = emotion_classifier(text)[0]
    sorted_emotions = sorted(emotion_scores, key=lambda x: x["score"], reverse=True)
    top_emotions = [e["label"] for e in sorted_emotions if e["score"] > 0.25]
    if len(top_emotions) < 2:
        top_emotions = [e["label"] for e in sorted_emotions[:2]]

    # topic detection
    topic_results = topic_classifier(text, candidate_labels)
    topics = [label for label, score in zip(topic_results["labels"], topic_results["scores"]) if score > 0.3]
    if not topics:
        topics = [topic_results["labels"][0]]

    # save to DB
    entry = JournalEntry(
        user_id=payload.user_id,
        text=text,
        emotions=",".join(top_emotions),
        topics=",".join(topics),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)

    return {
        "id": entry.id,
        "emotions": top_emotions,
        "topics": topics,
        "text": text,
        "created_at": entry.created_at.isoformat()
    }

# fetch all entries for a user
@app.get("/entries/{user_id}")
def get_entries(user_id: str, db: Session = Depends(get_db)):
    entries = (
        db.query(JournalEntry)
        .filter(JournalEntry.user_id == user_id)
        .order_by(JournalEntry.created_at.desc())
        .all()
    )

    result = [
        {
            "id": e.id,
            "text": e.text,
            "emotions": e.emotions.split(","),
            "topics": e.topics.split(","),
            "created_at": e.created_at.isoformat()
        }
        for e in entries
    ]

    return JSONResponse(content=result)

@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(JournalEntry).filter(JournalEntry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    db.delete(entry)
    db.commit()
    return {"message": "Entry deleted"}