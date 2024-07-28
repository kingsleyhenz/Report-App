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

