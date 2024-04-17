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
  console.log(userId);

  try {
    const userTopics = await User.findById(userId);
    res.status(200).json({ topics: userTopics.topics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user topics', error: error.message });
  }
});



app.patch('/user/topics/:userId', async (req, res) => {
  const { userId } = req.params;
  const { topics } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { topics: topics }, { new: true });
    res.status(200).json({ message: 'Topics updated successfully', updatedTopics: updatedUser.topics });
  } catch (error) {
    res.status(500).json({ message: 'Error updating topics', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


/**
 * Documentation for News Aggregator API Server
 *
 * Overview:
 * This server acts as the backend for a News Aggregator application. It is built using Express.js and connects to a MongoDB database
 * for user authentication and management. The server provides endpoints for user registration, login, OTP verification, and for fetching
 * user-selected topics.
 *
 * Database Connection:
 * - Uses Mongoose to connect to MongoDB.
 * - The connection string should be replaced with your MongoDB connection string.
 *
 * Endpoints:
 * - POST /signup: Registers a new user.
 * - POST /login: Authenticates a user and returns a session token.
 * - POST /send-otp: Sends an OTP to the user's email for verification purposes.
 * - POST /submit-otp: Verifies the submitted OTP against the server-stored value.
 * - GET /user/topics/:userId: Fetches the topics selected by the user, identified by userId.
 *
 * Middleware:
 * - `body-parser`: Parses incoming request bodies in a middleware before handlers, available under `req.body`.
 * - `cors`: Enables CORS to allow the frontend application to communicate with the server from different origins.
 *
 * Setup and Execution:
 * - Ensure MongoDB is accessible and the connection string is correctly set in the `connectToDatabase` function.
 * - Run `npm install` to install dependencies.
 * - Start the server using `npm start` or `node [entryFile].js`.
 * - The server will listen on the specified port and log a message indicating successful startup.
 *
 * Note:
 * This server setup is intended for educational purposes and prototype development. For production environments,
 * consider securing sensitive endpoints, using environment variables for configuration, and implementing additional
 * security measures such as HTTPS, input validation, and error handling.
 */
