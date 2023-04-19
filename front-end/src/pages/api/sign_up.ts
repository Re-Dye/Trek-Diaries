import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"

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
        if(countUser)
        {
            console.log("unsuccessfull try")
            res.status(400).json({ success: false })
        }
            const user:any = new User()            
            user.email = email;
            user.password = password;
            user.first_name = firstName;
            user.last_name = lastName;
            user.dob = dob;
            await user.save()
            console.log("User has been created...")
            res.status(201).json({ success: true, data: user })
        //create mongo model of given data and store in database
       

        // res.status(201).json({ user })

        /* dont use this, REMOVE LATER */
        //res.status(200).json({ firstName, lastName, email, password, dob })
    }
}