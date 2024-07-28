import axios from "axios";
import { PayDto } from "../../dto/payment.dto";
import { customError } from "../../error/customError";
import { db } from "../../utils/db.utils";
import { PaymentServices } from "../payment.service";


export class PaymentImpl implements PaymentServices{
   async makePayment(data: PayDto): Promise<{ url: string; }> {
        const transaction = await db.transaction.create({
            data: {
                amount: data.amount,
                user_id: data.user_id,
                description: data.description,
            }
        });

        const ref = `REF-${transaction.id}`;
        const actualAmount = data.amount * 100
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const url = 'https://api.paystack.co/transaction/initialize'
        const headers = {
            Authorization: `Bearer ${secret}`
        };

        const body = {
            email: data.email,
            amount: actualAmount.toString(),
            reference: ref,
            channels: ["card", "USSD"],
            metadata: {
                for: "Subscription"
            }
        };
        const res = await axios.post(url, body, {
            headers,
            validateStatus: ()=>true,
        })
        console.log(res);
        
        if(res.status != 200 && !res.data.status){
            throw new customError(409, res.data)
        } return {url: res.data.data.authorization_url}
    }

    async flutterWave(data: PayDto): Promise<{ url: string; }> {
        const transaction = await db.transaction.create({
            data: {
                amount: data.amount,
                user_id: data.user_id,
                description: data.description,
            }
        });
    
        const ref = `REF-${transaction.id}`;
        const actualAmount = data.amount;
        const secret = process.env.FLUTTERWAVE_SECRET_KEY;
        const url = 'https://api.flutterwave.com/v3/payments';
        const headers = {
            Authorization: `Bearer ${secret}`,
        };
    
        const body = {
            tx_ref: ref,
            amount: actualAmount.toString(),
            currency: "NGN",
            redirect_url: "http://www.netflix.com",
            customer: {
                email: data.email,
                name: data.name
            },
            customizations: {
                title: "Payment for Subscription",
                description: data.description,
            }
        };
    
        const res = await axios.post(url, body, {
            headers,
            validateStatus: () => true,
        });
        console.log(res);
        if (res.status !== 200 || !res.data.status) {
            throw new customError(409, res.data.message);
        }
        return { url: res.data.data.link };
    }
}