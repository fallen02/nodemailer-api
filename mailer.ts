import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: process.env.MAIL_PORT!,
  secure: true,
  auth: {
    user: process.env.MAIL_AUTH_USER!,
    pass: process.env.MAIL_AUTH_PASS!,
  },
} as nodemailer.TransportOptions);

export const sendMail = async ({
  fullname,
  email,
  phone,
  message,
}: {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const res = await transporter.sendMail({
    from: process.env.MAIL_FROM!,
    to: process.env.MAIL_TO,
    subject: "New Lead From Website",
    text: `Full Name => ${fullname} | Email => ${email} | Phone => ${phone} | Message => ${message}`,
    html: `Full Name => ${fullname} | Email => ${email} | Phone => ${phone} | Message => ${message}`,
  });
  // console.log(res);
  return res;
};

