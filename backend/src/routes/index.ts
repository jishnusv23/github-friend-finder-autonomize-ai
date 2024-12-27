import { createUserData } from "../controller/userController";
import { Router } from "express";


export const Routes = () => {
  const router = Router();

  router.get("/create-user/:username",createUserData);


  return router
};
