from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, default="")
    priority = Column(String, default="baja")  # baja, media, alta
    status = Column(Boolean, default=False)  # False: pendiente, True: completada
    created_at = Column(DateTime, default=datetime.utcnow)
