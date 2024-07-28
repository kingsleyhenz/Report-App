import { NextFunction, Request, Response } from "express";
import { PaymentImpl } from "../service/serviceImpl/paymentImpl";
import { PayDto } from './../dto/payment.dto';


export class PaymentController{
    private paymentService: PaymentImpl

    constructor (){
        this.paymentService = new PaymentImpl();
    }

    public payment = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const paymentDto = req.body as PayDto;
            const response = await this.paymentService.makePayment(paymentDto);
            res.status(200).json(response)
        } catch (error) {
            
        }
    }
}