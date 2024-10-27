import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { usefirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebase = usefirebase();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const navigate=useNavigate()

  useEffect(()=>{
    if(firebase.isLoggedIn){
        // home
        navigate("/")
    }
  },[firebase,navigate])

  return (
    <Form className="container mt-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
            e.preventDefault();
          const result=await firebase.loginEmailandPass(email, pass);
          console.log(result)
          setemail("");
          setpass("");
        }}
      >
        Login
      </Button>
      <h5>or</h5>
      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
            e.preventDefault();
            const result=await firebase.singUpGoogle(email, pass);
            console.log(result)
            setemail("");
            setpass("");
        }}
      >
        SignUp With Google
      </Button>
    </Form>
  );
};

export default Login;
