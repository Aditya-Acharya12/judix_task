from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user
from app.db import users_collection
from app.models.user import UserUpdate

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me")
async def get_profile(user=Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "email": user["email"]
    }

@router.patch("/me")
async def update_profile(updates: UserUpdate, user=Depends(get_current_user)):
    update_data = {k:  v for k, v in updates.dict().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": update_data}
    )

    return {"message": "Profile updated"}