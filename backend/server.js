import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import { signin } from "./controller/users.js";
import { signup } from "./controller/signup.js";
import { sendotp } from "./controller/sendotp.js";
import { sumbitotp } from "./controller/sumbitotp.js";
import { User } from "./models/user.js";


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
      "mongodb+srv://saurav:saurav@cluster0.gmhykap.mongodb.net/",
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


// New endpoint for fetching user-selected topics based on user ID
app.get('/user/topics/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userTopics = await User.findById(userId);
    res.status(200).json({ topics: userTopics.topics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user topics', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
