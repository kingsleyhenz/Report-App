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

    public handleFlutterwave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{    
        const signature = req.headers['verif-hash'] as string;
        console.log(req.headers);   
        
        console.log("Incoming signature:", signature);
        if (!signature) {
            throw new Error("No signature found");
        }
        await this.webhookService.verifyFlutterwave(signature);
        res.status(200).send();
        await this.webhookService.handleFlutterwave(req.body);
    } catch (error) {
        console.error("Error handling webhook:", error);
        next(error);
    }
    }
}