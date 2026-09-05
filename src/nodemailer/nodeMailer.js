//config the SMTP
import nodemailer from "nodemailer";
import { Resend } from "resend";
// Create a transporter using SMTP

/* USING NODEMAILER */
// const transporter = nodemailer.createTransport({
//   //host: "smtp.ethereal.email",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

/* USING REACT Resend */
const apiKey = process.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

//Email processor

const emailPreocessor = async (template) => {
  try {
    // const result = await transporter.sendMail(template);
    const result = await resend.emails.send(template);
    console.log(result?.data?.id);
  } catch (error) {
    console.log(error);
  }
};
//create the emial processor send out the email
export const userUpdateTemplate = ({ email, token }) => {
  //const sender = process.env.SMTP_USER;
  const sender = "ftapp@yadin-nou.dev";
  const userRouter = "/api/v1/users";
  //const serverURL = process.env.VITE_ROOT_URL;
  const serverURL = "https://app.yadin-nou.dev";
  //const link = serverURL + userRouter + "/email_confirm?token=" + token;
  const link = serverURL + "/email_confirm?token=" + token;
  // console.log(link);
  const obj = {
    // from: '"Yadin" <giovani.willms@ethereal.email>', // sender address
    from: "Financial Tracker App <" + sender + ">",
    to: email, // list of recipients
    subject: "Welcome to Financial Tracker App", // subject line
    text: `Thanks for signing up. 
    Your account has been created successfully, 
    and you're all set to get started`, // plain text body
    html:
      `<p>Thanks for signing up. 
    Your account has been created successfully, 
    and you're all set to get started.</p>
    <h5>Please confirm email</h5>
    <p><a href="` +
      link +
      `">Click to confirm</a></p>
    Best regards,<br/>
    Yadin Nou
    `, // HTML body
  };

  emailPreocessor(obj);
};
