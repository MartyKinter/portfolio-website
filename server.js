const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const PORT = process.env.PORT || 5001;

//Middleware
app.use("/assets", express.static("assets"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(process.env.USER);
  console.log(process.env.PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.TO_EMAIL,
    subject: `contact form message from ${req.body.email}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});