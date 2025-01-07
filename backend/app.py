from fastapi import FastAPI
from routes.tasks import router as task_router
from database import engine, Base

# Inicializar la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Registrar las rutas
app.include_router(task_router, prefix="/api/tasks", tags=["tasks"])
