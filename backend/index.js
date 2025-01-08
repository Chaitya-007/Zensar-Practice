import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config({});
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL;

// 1st dimension is route, 2nd is callback function
// to get resource from server
app.get("/", (request, response) => {
  console.log("Hello from server");
  return response.status(234).send("Hello from server");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // 1st dimension is port, 2nd is callback function
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
