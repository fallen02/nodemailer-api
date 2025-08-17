import Express, { type Response, type Request } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import {sendMail} from './mailer.ts'

const app = Express();
const port = process.env.PORT || 3000;
app.use(
  helmet({
    crossOriginEmbedderPolicy: process.env.NODE_ENV !== "development",
  }),
);
app.use(cors());

app.use(Express.json());

app.get("/", (_, res) => {
  return res.send("Welcome to Gangasagar");
});

app.post("/send", async (req, res) => {
  const body = await req.body;
  const {fullname, email, phone, message} = body
  const response = await sendMail({fullname, email, phone, message})
  if(!response.messageId) res.send({error: "Email not sent!!"})
  return res.send({success: "Email sent successfully!!"});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
