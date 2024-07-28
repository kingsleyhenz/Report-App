import { Router } from "express";
import { CreateUserDto } from "../dto/createUser.dto";
import { validationMiddleware } from './../middleware/validation.middleware';
import { createUser} from './../controller/user.controller';


const userRouter = Router();

userRouter.post('/create-user', validationMiddleware(CreateUserDto), createUser);

export default userRouter;