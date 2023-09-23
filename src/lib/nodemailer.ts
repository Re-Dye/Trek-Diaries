import { url } from "inspector";
import nodemailer, { TransportOptions } from "nodemailer";

const sendEmail = async ({
  email,
  subject,
  link,
}: {
  email: string;
  subject: string;
  link: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    } as TransportOptions);

    const emailContent = `
  <html>
    <head>
      <style>
        /* Add custom CSS styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .message {
          font-size: 16px;
          color: #555;
          margin-bottom: 20px;
        }

        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
        }

        .button:hover {
          background-color: #0056b3;
        }

        .button.verify {
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">One More Step!!!</h1>
        <p class="message">Thank you for following up. To complete the process, please click the button below:</p>
        <a class="button verify" href="${link}">Click Me</a>
      </div>
    </body>
  </html>
`;

    let success = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: "Please Verify your Email!!!" + link,
      html: emailContent,
    });
    if (success) {
      console.log("Email has been sent successfully");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in sending email");
  }
};

export default sendEmail;
