import { User } from "../models/user.js";
import nodemailer from "nodemailer";

const sendotp = async (req, res) => {
  console.log(req.body);

  const _otp = (1000 + Math.random() * 9000).toFixed(0); // Generating OTP as a string
  console.log(_otp);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ code: 404, message: "User not found" });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "devsauravcode@gmail.com",
        pass: "pmqt wqao xwfw lzhn", 
      },
      authMethod: "PLAIN",
    });

    let info = await transporter.sendMail({
      from: "devsauravcode@gmail.com",
      to: req.body.email,
      subject: "Your OTP for Verification",
      text: _otp.toString(),
    });

    if (info.messageId) {
      const updatedUser = await User.updateOne({ email: req.body.email }, { otp: _otp });
      res.send({ code: 200, message: "OTP sent successfully", updatedUser });
    } else {
      res.send({ code: 500, message: "Service error" });
    }
  } catch (err) {
    console.error(err);
    res.send({ code: 500, message: "Internal server error" });
  }
};

export { sendotp };
