import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usefirebase } from "../context/firebase";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useNavigate } from "react-router-dom";

const BookDetail = () => {
  const params = useParams();
  const firebase = usefirebase();
  const navigate=useNavigate();

  const [book, setbook] = useState();
  const [url, seturl] = useState("");
  const [qty, setqty] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((book) => {
      setbook(book.data());
      firebase
        .getImageurl(book.data().imageURL)
        .then((url) => seturl(url));
    });
  }, []);
  if (book == null) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={url}
          style={{
            minHeight: "300px",
            minWidth: "300px",
            maxHeight: "400px",
            borderRadius: "10px",
            margin: "10px",
          }}
        />
        <h2>Name : {book.name}</h2>
        <h3>Price : ${book.price}</h3>
        <h4>ISBN : {book.isbn}</h4>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="Number"
            name="price"
            placeholder="Enter number of books"
            value={qty}
            onChange={(e) => {
              if (e.target.value > 0) {
                setqty(e.target.value);
              }
            }}
          />
        </Form.Group>
        <Button
          variant="success"
          onClick={(e) => {
            const result=firebase.placeOrder(params.bookId, qty).then(result=>
            {
                console.log(result)
            })
            navigate("/")
          }}
          style={{ fontSize: "20px" }}
        >
          Buy Now
        </Button>
      </div>
      <div className="container">
        <img
          src={book.userphotoURL}
          height={"40px"}
          style={{ borderRadius: "50%" }}
          alt=""
        />
        <h4>Created By : {book.useremail}</h4>
      </div>
    </>
  );
};

export default BookDetail;
