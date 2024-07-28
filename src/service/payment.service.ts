import { PayDto } from "../dto/payment.dto";


export interface PaymentServices{
    makePayment(data: PayDto): Promise<{url: string}>;
    flutterWave(data: PayDto): Promise<{url: string}>;
}