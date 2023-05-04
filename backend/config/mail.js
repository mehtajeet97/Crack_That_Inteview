import * as dotenv from "dotenv";
import { createTransport } from "nodemailer";

dotenv.config();
const emailTemplate = {
  register: "",
};

const getHTMLEmail = (user, mailType) => {
  let templates = {
    register: `Welcome, ${user.firstName}!`,
    login: `Welcome back, ${user.firstName}!`,
  };
  const htmlString = `
            <html>
              <head>
                <title>${templates[mailType]}</title>
              </head>
              <body>
              <h1>Hello, ${user.firstName}</h1>
                <p>Thank you for registering with CrackThatInterview.</p>
                <p>Your username ${user.email}:</p>
              </body>
            </html>
          `;
  return htmlString;
};

export const sendEmail = async (user, mailType) => {
  const htmlString = getHTMLEmail(user, mailType);

  let emailOptions = {
    subject: "CrackThatInterview: Welcome to the best interview experience.",
    text: "CrackThatInterview",
    to: user.email,
    from: process.env.SMTP_EMAIL,
    html: htmlString,
  };

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  transporter.sendMail(emailOptions, (err, succ) => {
    if (err) {
      console.log("Nodemailer: " + JSON.stringify(err));
    } else {
      console.log("Nodemailer: " + JSON.stringify(succ));
    }
  });
};

// This code block is to run and test the mail function as a standalone functionality.
// try {
//   let name = "Dhruv";
//   await sendEmail({
//     subject: "CrackThatInterview: Welcome to the best interview experience.",
//     text: `Hey ${name}`,
//     to: "dhruvvaghela17@gmail.com",
//     from: process.env.SMTP_EMAIL,
//     html: htmlString,
//   });
// } catch (e) {
//   console.dir(e);
// }
