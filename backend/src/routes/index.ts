import { createUserData, delteUser, getAllUsers } from "../controller/userController";
import { Router } from "express";


export const Routes = () => {
  const router = Router();

  router.get("/create-user/:username",createUserData);
  router.get("/get-users",getAllUsers);
  router.delete('/delete-user/:id',delteUser);


  return router
};
