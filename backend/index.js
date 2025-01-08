import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { BookModel } from "./models/bookModel.js";

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

// route to create new book
app.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await BookModel.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
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
