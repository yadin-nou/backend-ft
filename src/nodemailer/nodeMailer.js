//config the SMTP
import nodemailer from "nodemailer";
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  //host: "smtp.ethereal.email",
  host: "smtp.gmail.com",
  //port: 587,
  port: 465,
  //secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

//Email processor

const emailPreocessor = async (template) => {
  try {
    const result = await transporter.sendMail(template);
    console.log(result.messageId);
  } catch (error) {
    console.log(error);
  }
};
//create the emial processor send out the email
export const userUpdateTemplate = ({ name, email, token }) => {
  const sender = process.env.SMTP_USER;
  const userRouter = "/api/v1/users";
  const serverURL = process.env.VITE_ROOT_URL;
  const link = serverURL + userRouter + "/email_confirm?token=" + token;
  // console.log(link);
  const obj = {
    // from: '"Yadin" <giovani.willms@ethereal.email>', // sender address
    from: name + " <" + sender + ">",
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
    Best Regard,<br/>
    Yadin Nou
    `, // HTML body
  };

  emailPreocessor(obj);
};
