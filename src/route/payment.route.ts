import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
import { PayDto } from "../dto/payment.dto";
import { validationMiddleware } from './../middleware/validation.middleware';


const paymentRoute = Router();
const paymentController = new PaymentController();

paymentRoute.post("/", validationMiddleware(PayDto), paymentController.payment);
paymentRoute.post("/fl", validationMiddleware(PayDto), paymentController.flutterWave);

export default paymentRoute;