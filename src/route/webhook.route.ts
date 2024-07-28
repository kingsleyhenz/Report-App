import { Router } from "express";
import { WebhookController } from "../controller/webHook.controller";
import { validationMiddleware } from './../middleware/validation.middleware';


const webhookRoute = Router();
const webhookController = new WebhookController();

webhookRoute.post("/", webhookController.handle);
webhookRoute.post("/fl", webhookController.handleFlutterwave);

export default webhookRoute;