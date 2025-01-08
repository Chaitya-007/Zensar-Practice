import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      Books List
      <div>
        <Link to="/books/create">Create</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishYear}</td>
                <td>
                  <div>
                    <Link to={`/books/details/${book._id}`}>Deatils</Link>
                    <Link to={`/books/edit/${book._id}`}>Edit</Link>
                    <Link to={`/books/delete/${book._id}`}>Delete</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
