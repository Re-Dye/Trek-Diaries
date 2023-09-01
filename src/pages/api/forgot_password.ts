import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"
import sendEmail from "../../../lib/nodemailer"
import Token from "../../../lib/modals/Token"
import crypto from "crypto" 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        try{
            const { email } = req.body as any;

            if (await dbConnect()){
                console.log("Connection established....");
            }

            const user: any = await User.findOne({email: email});
            console.log(user.email);
            if(!user) //if email doesn't exists
            {
                console.log("Unregistered Email!!!")
                return res.status(409).json({ success: false, error:"Unregistered Email" })
            }

            const token:any = new Token();
            token.token = crypto.randomBytes(32).toString("hex");
            await token.save();
            
            const url: any = `${process.env.BASE_URL}users/${user._id}/reset/${token.token}`;
            console.log(url)

            // sending mail via nodemailer.....
            await sendEmail(user.email,"Reset Your Password",url)
            return res.status(201).json({ success: true })
        }catch(error){
            console.log(error)
        }

    }
}