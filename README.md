Whisper Journal is a voice-based journaling web app that transcribes spoken entries and categorizes them using NLP. It uses OpenAI’s Whisper for transcription and HuggingFace models for emotion and topic detection.

## 🧠 AI Models Used

- **Transcription**: OpenAI Whisper (via FastAPI backend)
- **Emotion Detection**: `j-hartmann/emotion-english-distilroberta-base`
- **Topic Classification**: `facebook/bart-large-mnli`


## Frontend 
- Next.js (React)  
- TailwindCSS  
- NextAuth.js (OAuth authentication)

## Backend
- FastAPI (Python)  
- PostgreSQL  
- SQLAlchemy ORM
