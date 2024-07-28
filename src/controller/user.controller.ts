import { UserServiceImplementation } from "./../service/serviceImpl/userServiceImp.service";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "./../dto/createUser.dto";

const userService = new UserServiceImplementation();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createUserPayload: CreateUserDto = req.body;
    const user = await userService.createUsers(createUserPayload);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.listUser();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};  