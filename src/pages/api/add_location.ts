import dbConnect from "../../../lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next";
import Location from "../../../lib/modals/Location";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { address, description } = req.body as any;
    
            if (await dbConnect())
            {
                console.log("Connection established....");
            }
    
            const countLocation = await Location.countDocuments({ address });
            console.log(countLocation);
            if(countLocation) //if email already exists
            {
                console.log("Duplicate Email!!!")
                return res.status(409).json({ success: false, error:"Location already exists" })
            }
    
            const location: any = new Location()
            location.address = address
            location.description = description
            await location.save()
            console.log(`Location: ${ address } has been created.`)
            return res.status(201).json({ success: true, data: location })
        } catch(error) {
            return res.status(500).json({ success: false, error })
        }
    }
}