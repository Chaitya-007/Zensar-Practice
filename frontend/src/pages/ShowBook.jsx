import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Loader from "../components/Loader.jsx";

const ShowBook = () => {
  const [book, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <BackButton />
      <h1>Show Book</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h3>id : {book._id}</h3>
          <h3>Title : {book.title}</h3>
          <h3>Author : {book.author}</h3>
          <h3>Publish Year : {book.publishYear}</h3>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
