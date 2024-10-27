import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { usefirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const Listing = () => {

    const firebase = usefirebase();
    const [name, setname] = useState("");
    const [isbnNumber, setisbnNumber] = useState("");
    const [price, setprice] = useState("")
    const [coverPic, setcoverPic] = useState('')

    const navigate=useNavigate()

    const handlesubmit=async(e)=>{
      e.preventDefault();
      await firebase.handleNewListing(name,isbnNumber,price,coverPic)
      setname("")
      setisbnNumber("")
      setprice("")
      setcoverPic("")
      navigate("/")
    }
  
    return (
      <Form className="container mt-5">
        <Form.Group className="mb-3" >
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            name="Enter Bookname"
            placeholder="Enter book name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            placeholder="Enter ISBN Number"
            value={isbnNumber}
            onChange={(e) => setisbnNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              console.log(e.target.files)
              setcoverPic(e.target.files[0])
              }
            }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handlesubmit}
        >
          Create
        </Button>
        
      </Form>
    );
  };
export default Listing