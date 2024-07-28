import { PayDto } from "../dto/payment.dto";


export interface PaymentServices{
    makePayment(data: PayDto): Promise<{url: string}>;
}