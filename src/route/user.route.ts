import { Router } from "express";
import { CreateUserDto } from "../dto/createUser.dto";
import { validationMiddleware } from './../middleware/validation.middleware';
import { createUser, getUserById, getUsers} from './../controller/user.controller';


const userRouter = Router();

userRouter.post('/create-user', validationMiddleware(CreateUserDto), createUser);
userRouter.get('/get-user/:id', getUserById);
userRouter.get('/get-all-users', getUsers);

export default userRouter;