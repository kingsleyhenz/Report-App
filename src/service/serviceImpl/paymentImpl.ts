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

}