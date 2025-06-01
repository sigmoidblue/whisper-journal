from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from db import Base

class JournalEntry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # from Google session.sub
    text = Column(String)
    emotions = Column(String)
    topics = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
