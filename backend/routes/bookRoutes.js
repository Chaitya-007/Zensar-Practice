import express from "express";
import { BookModel } from "../models/bookModel.js";

const router = express.Router();

// route to create new book
router.post("/", async (request, response) => {
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

// get all books with the help of mongoose
router.get("/", async (request, response) => {
  try {
    const books = await BookModel.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// get one book with the help of mongoose
router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const book = await BookModel.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// update book by id
router.put("/:id", async (request, response) => {
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

    const id = request.params.id;

    const result = await BookModel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).send({ message: "Book Not Found" });
    }

    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Delete book by id
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const result = await BookModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book Not Found" });
    }

    return response.status(200).send({ messge: "Book Deleted Successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
