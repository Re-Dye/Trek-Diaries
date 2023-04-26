import dbConnect from "../../../lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../lib/modals/Post";
import Location from "../../../lib/modals/Location";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const {Description, locationId} = req.body as any;

            if (await dbConnect()) // connect to database
            {
                console.log("Connection established in addPost");
            }
            
            const location: any = await Location.findById(locationId); // importing address from location
            const address = location.address;
            if(!address)
            {
                return res.status(422).json({
                    status: 400,
                    message: "Location not found"
                });
            }


            const newPost: any = new Post(); // creating new post
            newPost.description = Description;
            newPost.location.id = locationId;
            newPost.location.address = address;
            await newPost.save();

            return res.status(201).json({ success: true, data: newPost })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false })
        }
    }
    
}
