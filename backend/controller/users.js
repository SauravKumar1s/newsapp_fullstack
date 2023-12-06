// users.js
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(200).send({ code: 200, message: "User not found" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err || !result) {
            res.status(200).send({
              code: 200,
              message: "Incorrect password",
              providedPassword: req.body.password,
            });
          } else {
            res.status(200).send({
              email : result.email,
              code: 200,
              message: "User signed in",
              token: "saurav token",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ code: 500, message: "Internal server error" });
    });
};

export { signin };
