import { Request, Response, NextFunction } from "express";
import axios from "axios";
import UserModel, { User, UserAttributes } from "../models/userModel";

export const createUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params, "kokokok");
    const { username } = req.params;
    const existingUser = await UserModel.findOne({
      where: { username },
    });
    if (existingUser) {
        console.log('existingUser')
      res.status(200).json(existingUser);
    } else {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      // console.log("🚀 ~ file: userController.ts:13 ~ response:", response);
      const userData: UserAttributes = {
        username: response.data.login,
        email: response.data.email,
        bio: response.data.bio,
        location: response.data.location,
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        type: response.data.type,
        repos_url: response.data.repos_url,
        deleted: false,
        followers: response.data.followers,
        following: response.data.following,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      };
      console.log("🚀 ~ file: userController.ts:46 ~ userData:", userData);
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    }
  } catch (error: any) {
    next({
      statusCode: 500,
      message: "Internal server error while fetching user data",
      error: error.message,
    });
  }
};
