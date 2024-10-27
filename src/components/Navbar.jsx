import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { usefirebase } from "../context/firebase";
import { NavLink } from "react-router-dom";


function NavBar() {
    const firebase=usefirebase()

  return (
    <Navbar expand="lg" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="#home">Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            {firebase.isLoggedIn? 
            <>
              <Nav.Link href="/book/list">Add Listing</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/book/userlist">My Books</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={e=>{
              firebase.signout()
            }}>SignOut</NavDropdown.Item>
            </NavDropdown></>
            :
            <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">SignUp</Nav.Link>
            </>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
