import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Anime-Eiga
        </Navbar.Brand>
        {/* Hamburger dropdown menu for small screen */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                {/* dropdown list for genres */}
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Romance</NavDropdown.Item>
                  <NavDropdown.Item href="#">Comedy</NavDropdown.Item>
                  <NavDropdown.Item href="#">Tragedy</NavDropdown.Item>
                  <NavDropdown.Item href="#">Fantasy</NavDropdown.Item>
                  <NavDropdown.Item href="#">Supernatural</NavDropdown.Item>
                </NavDropdown>
                {/* Align these links to the right */}

                <Nav.Link href="">Favorites</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Username</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">My Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLoggedOut}>
                    <Link to="/login">Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>

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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
