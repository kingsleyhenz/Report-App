import { NextFunction, Request, Response } from "express";
import { customError } from "../error/customError";
import { webHookImpl } from "../service/serviceImpl/webHookImpl";


export class WebhookController{
    private webhookService: webHookImpl;

    constructor(){
        this.webhookService = new webHookImpl();
    }

    public handle = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const signature = <string>req.headers['x-paystack-signature'];
            await this.webhookService.verify(signature, req.body);
            res.status(200).send();
            await this.webhookService.handle(req.body)
        } catch (error) {
            
        }
    }
}