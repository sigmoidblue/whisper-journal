# Whisper Journal

Whisper Journal is a voice-based journaling web app that transcribes spoken entries and categorizes them using NLP. It uses OpenAI’s Whisper for transcription and HuggingFace models for emotion and topic detection.


## 🧠 AI Models Used

- **Transcription**: OpenAI Whisper (via FastAPI backend)
- **Emotion Detection**: `j-hartmann/emotion-english-distilroberta-base`
- **Topic Classification**: `facebook/bart-large-mnli`

## 🖥️ Tech Stack

### Frontend
- Next.js (React)  
- TailwindCSS  
- NextAuth.js (OAuth authentication)

### Backend
- FastAPI
- PostgreSQL  
- SQLAlchemy ORM


## ⚙️ Local Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/sigmoidblue/whisper-journal.git
cd whisper-journal
```

## Frontend Setup

```bash
npm install
npm run dev
```

Create a `.env.local` file and add the following:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://<username>:<password>@localhost/whisper_journal
```

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```


## 🛢️ PostgreSQL Database Setup

If you haven't created the database yet, run:

```bash
psql postgres
```

Inside the PostgreSQL shell:

```sql
CREATE DATABASE whisper_journal;
\q
```

Ensure your `.env.local` contains the correct `DATABASE_URL`
