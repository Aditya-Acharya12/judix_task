from fastapi import FastAPI
from app.routes import auth, tasks, users

app = FastAPI()

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(users.router)

@app.get("/")
def health():
    return {"status": "ok"}