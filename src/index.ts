import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './utils/errorHandle';
import userRouter from './route/user.route';
import paymentRoute from './route/payment.route';
import webhookRoute from './route/webhook.route';

dotenv.config();

const portFromEnv  = process.env.PORT 
if(!portFromEnv){
    console.error("Error: port from environment not set")
    process.exit(1)
}

const PORT:number = parseInt(portFromEnv, 10)
if(isNaN(PORT)){
    console.error("Error: port number is not a valid number");
    process.exit(1)
}
const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/webhook", webhookRoute);


app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is active on port ${PORT}`);
})