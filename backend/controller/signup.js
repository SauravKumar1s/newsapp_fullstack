import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const signup = (req, res) => {
  // Check if the user already exists by email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(409).send({
          code: 409,
          message: "User with this email already exists",
        });
      } else {
        // Hash the password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            res.status(500).send({
              code: 500,
              message: "Error hashing password",
            });
          } else {
            const newUser = new User({
              email: req.body.email,
              password: hashedPassword,
              topics: req.body.topics 
            });

            // Save the user to the database
            newUser.save()
            .then((savedUser) => {
              const userId = savedUser._id; // Assuming the user ID is stored in _id field
              res.status(201).send({
                code: 201,
                message: "User created successfully",
                user: savedUser,
                userId: userId // Sending the userId back as a response
              });
            })
            .catch((err) => {
              res.status(500).send({
                code: 500,
                message: "Error creating user",
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Service error",
      });
    });
};

export { signup };
