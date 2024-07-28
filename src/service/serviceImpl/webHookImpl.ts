import axios from "axios";
import { createHmac } from "crypto";
import { customError } from "../../error/customError";
import { db } from "../../utils/db.utils";
import { webHookService } from "../webhook.service";

export class webHookImpl implements webHookService {
  async handle(data: any): Promise<void> {
    try {
      if (data.event === "charge.success") {
        const ref = data.data.reference as string;
        const transaction_id = Number(ref.split("-")[1]);

        const transaction = await db.transaction.findFirst({
          where: {
            id: transaction_id,
          },
        });
        if (
          transaction?.status === "successful" ||
          transaction?.status === "failed"
        ) {
          return;
        }
        await db.transaction.update({
          where: {
            id: transaction_id,
          },
          data: {
            status: "successful",
          },
        });
      }
    } catch (error) {
      console.log("error in updating transaction");
    }
  }

  verify(signature: string, data: any): boolean | Promise<boolean> {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      throw new customError(500, "Your Secret Key is not set");
    }
    const hash = createHmac("sha512", secret)
      .update(JSON.stringify(data))
      .digest("hex");
    if (signature !== hash) {
      throw new customError(409, "Invalid signature");
    }
    return true;
  }

  async handleFlutterwave(data: any): Promise<void> {
    try {
      console.log("Received payload:", data);
      if (data.status === "successful") {
        const ref = data.txRef;
        const transaction_id = Number(ref.split("-")[1]);
        const transaction = await db.transaction.findFirst({
          where: {
            id: transaction_id,
          },
        });
        if (
          transaction?.status === "successful" ||
          transaction?.status === "failed"
        ) {
          return;
        }
        await db.transaction.update({
          where: {
            id: transaction_id,
          },
          data: {
            status: "successful",
          },
        });
      }
    } catch (error) {
      console.log("Error in updating");
    }
  }

  verifyFlutterwave(signature: string): boolean | Promise<boolean> {
    const secret = process.env.FLUTTERWAVE_SECRET_HASH;
    if (!secret) {
      throw new customError(500, "Your Secret Hash is not set");
    }
    console.log("Received signature:", signature);
    if (signature !== secret) {
      throw new customError(409, "Invalid signature");
    }
    return true;
  }
}
