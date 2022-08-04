import * as functions from "firebase-functions";
import {
  getUserPhotoUrlController,
  deleteUserController,
  createUserController,
} from "../controllers/user";
import { User } from "../modules/user/model";

export const getUserPhotoUrl = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    try {
      await getUserPhotoUrlController(snap.data() as User);
    } catch (error) {
      console.log(error);
    }
  });

export const createUser = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    await createUserController(snap.data() as User);
  });

export const deleteUser = functions.firestore
  .document("users/{userID}")
  .onDelete(async (snap, context) => {
    await deleteUserController(snap.data() as User);
  });
