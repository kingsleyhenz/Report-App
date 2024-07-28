import { Router } from "express";
import { CreateUserDto } from "../dto/createUser.dto";
import { validationMiddleware } from './../middleware/validation.middleware';
import { createUser, deleteUser, getUserById, getUsers, updateUser} from './../controller/user.controller';
import { UpdateUserDto } from "../dto/updateUser.dto";


const userRouter = Router();

userRouter.post('/create-user', validationMiddleware(CreateUserDto), createUser);
userRouter.get('/get-user/:id', getUserById);
userRouter.get('/get-all-users', getUsers);
userRouter.put('/update-user/:id', validationMiddleware(UpdateUserDto), updateUser);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;