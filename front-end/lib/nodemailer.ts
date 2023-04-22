import nodemailer from "nodemailer"

const sendEmail = async (email: any,subject: any,link: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        let success = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: "Please Verify your Email!!!" + link,
            html: `<a href="${link}">Verify Email.</a>`
        });
        console.log("Email has been sent successfully")
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;