from fastapi import APIRouter, Depends
from bson import ObjectId
from app.db import tasks_collection
from app.models.task import TaskCreate
from app.dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/")
async def create_task(task: TaskCreate, user=Depends(get_current_user)):
    result = await tasks_collection.insert_one({
        "title": task.title,
        "description": task.description,
        "completed": False,
        "user_id": user["_id"]
    })
    return {"id": str(result.inserted_id), "message": "Task created successfully"}

@router.get("/")
async def get_tasks(user=Depends(get_current_user)):
    tasks = []
    async for task in tasks_collection.find({"user_id": user["_id"]}):
        task["id"] = str(task["_id"])
        task["user_id"] = str(task["user_id"])
        del task["_id"]
        tasks.append(task)
    return tasks

@router.delete("/{task_id}")
async def delete_task(task_id: str, user=Depends(get_current_user)):
    result = await tasks_collection.delete_one({
        "_id": ObjectId(task_id),
        "user_id": user["_id"]  
    })
    if result.deleted_count == 0:
        return {"message": "Task not found"}
    return {"message": "Task deleted successfully"}
    