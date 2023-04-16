//import dbConnect


export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        //dbConnect()

        const { firstName, lastName, email, password, dob} = req.body as any
        console.log(firstName, lastName, email, password, dob)
        //create mongo model of given data and store in database

        // res.status(201).json({ user })

        /* dont use this, REMOVE LATER */
        res.status(200).json({ firstName, lastName, email, password, dob })
    }
}