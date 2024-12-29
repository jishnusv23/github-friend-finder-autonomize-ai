import { Request, Response, NextFunction } from "express";
import axios from "axios";
import  UserModel, { User, UserAttributes } from "../models/userModel";
import { Op } from "sequelize";

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
      console.log("existingUser");
      res.status(200).json(existingUser);
    } else {
      try{
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
      }catch(error:any){
         if (error.response && error.response.status === 404) {
            res.status(404).json({
             message: `GitHub user '${username}' not found. `,
           });
         }
         next(error)

      }
    }
  } catch (error: any) {
    next({
      statusCode: 500,
      message: "Internal server error while fetching user data",
      error: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.query);
    const { page, limit, search } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const searchQuery = search ? { name: { [Op.iLike]: `%${search}%` } } : {};
    let offset = (pageNumber - 1) * limitNumber;
    const { rows: users, count: totalUsers } = await UserModel.findAndCountAll({
      where: searchQuery,
      limit: limitNumber,
      offset,
    });
    console.log("🚀 ~ file: userController.ts:77 ~ users:", users);
    res.status(200).json({
      users,
      total: Math.ceil(totalUsers / limitNumber),
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error: any) {
    next(error);
  }
};

// delete user by id
export const delteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params, "params");
    const { id } = req.params;
    const deleteUserCount = await UserModel.destroy({
      where: {
        id,
      },
    });
    console.log(
      "🚀 ~ file: userController.ts:103 ~ deleteUser:",
      deleteUserCount
    );
    if (deleteUserCount == 0) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: false, message: "User deleted successully" });
  } catch (error: any) {
    next(error);
  }
};

