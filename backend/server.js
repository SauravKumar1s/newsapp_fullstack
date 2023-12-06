import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import { signin } from "./controller/users.js";
import { signup } from "./controller/signup.js";
import { sendotp } from "./controller/sendotp.js";
import { sumbitotp } from "./controller/sumbitotp.js";

const app = express();
app.use(cors());
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://saurav:saurav@cluster0.n2mjfgk.mongodb.net/yourDatabaseName?retryWrites=true&w=majority",
      {}
    );
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();

app.post("/signup", signup);
app.post("/login", signin);
app.post("/send-otp", sendotp);
app.post("/sumbit-otp", sumbitotp);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
