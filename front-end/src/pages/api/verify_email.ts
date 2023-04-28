import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"

export default async function handler(req: any, res: any){
    if(req.method === 'POST'){
        const {required_id} =  req.body as any
        console.log(required_id)
        const _id = `ObjectId('${required_id}')`
        if (await dbConnect())
        {
            console.log("Connection established in verify_email");
        }
        console.log(_id)
        await User.findOneAndUpdate({"_id" : required_id},{verified : true})
        return res.status(201).json({ success: true })
    }
}