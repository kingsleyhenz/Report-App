import { UserServiceImplementation } from "./../service/serviceImpl/userServiceImp.service";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "./../dto/createUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";

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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser: UpdateUserDto = req.body;
    const id = parseInt(req.params.id, 10);
    const user = await userService.updateUser(id, updatedUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};



export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    await userService.deleteUser(id);
    res.status(204).send()
  } catch (error) {
    next(error)
  }
};
