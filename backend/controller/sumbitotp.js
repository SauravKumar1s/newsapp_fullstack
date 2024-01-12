import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const saltRounds = 10; 

const sumbitotp = (req, res) => {
  console.log("Request Body:", req.body);

  User.findOne({ otp: req.body.otp })
    .then((user) => {
      console.log("Found User:", user);
      if (!user) {
        res.status(404).send({ code: 404, message: "User not found" });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            res.status(500).send({ code: 500, message: "Error hashing password" });
          } else {
            User.updateOne({ email: user.email }, { password: hash })
              .then(() => {
                console.log("Password updated");
                res.status(200).send({ code: 200, message: "Password updated" });
              })
              .catch((updateErr) => {
                console.error("Error updating password:", updateErr);
                res.status(500).send({ code: 500, message: "Service error" });
              });
          }
        });
      }
    })
    .catch((findErr) => {
      console.error("Error finding user:", findErr);
      res.status(500).send({ code: 500, message: "Error finding user" });
    });
};

export { sumbitotp };
