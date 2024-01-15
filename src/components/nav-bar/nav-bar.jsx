import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Anime-Eiga</Navbar.Brand>
        {/* Hamburger dropdown menu for small screen */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* dropdown list for genres */}
            <NavDropdown title="Genres" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Romance</NavDropdown.Item>
              <NavDropdown.Item href="#">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="#">Tragedy</NavDropdown.Item>
              <NavDropdown.Item href="#">Fantasy</NavDropdown.Item>
              <NavDropdown.Item href="#">Supernatural</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* Align these links to the right */}
          <Nav className="ml-auto">
            <Nav.Link href="">Favorites</Nav.Link>
            <Nav.Link href="">My Account</Nav.Link>
          </Nav>
          {/* search box with anime name */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
