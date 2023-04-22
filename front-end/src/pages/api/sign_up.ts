import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"
import sendEmail from "../../../lib/nodemailer"
import Token from "../../../lib/modals/Token"
import crypto from "crypto" 

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const {email, password, firstName, lastName,dob} = req.body as any
        await dbConnect();
        if (dbConnect())
        {
            console.log("Connection established....");
        }
        const countUser = await User.countDocuments({email:email});
        console.log(countUser);
        if(countUser) //if email already exists
        {
            console.log("Duplicate Email!!!")
            return res.status(409).json({ success: false, error:"user already exists" })
        }
            const user:any = new User()       //create mongo model of given data and store in database       
            user.email = email;
            user.password = password;
            user.first_name = firstName;
            user.last_name = lastName;
            user.dob = dob;
            await user.save()

            const token:any = new Token()
            token.userId = user._id;
            token.token = crypto.randomBytes(32).toString("hex")
            await token.save()

            const url: any = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
            console.log(`user has been created: ${user}`)
            console.log(`token has been created: ${token}`)
            console.log(`url: ${url}`);
            await sendEmail(user.email,"Verification Mail",url)
            
            return res.status(201).json({ success: true, data: user })

        // res.status(201).json({ user })

        /* dont use this, REMOVE LATER */
        //res.status(200).json({ firstName, lastName, email, password, dob })
    }
}