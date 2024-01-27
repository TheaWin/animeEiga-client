import { useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";

export const ProfileView = ({ user }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //use the data from localStorage as the default value
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  //to update user details
  const handleUpdate = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      name: name,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://anime-eiga-84a0980bd564.herokuapp.com/users/${storedUser.username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          alert("Profile edit failed");
        }
      })
      //parsed JSON data is passed as the argument to the callback function
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUsername(updatedUser);
          alert("Profile updated successfully");
        }
      });
  };

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>My Profile</Card.Title>
                <Card.Text>Username: {storedUser.username} </Card.Text>
                <Card.Text>Name:</Card.Text>
                <Card.Text>Email: </Card.Text>
                <Card.Text>Birthday: </Card.Text>
                <div className="d-flex justify-content-evenly w-100">
                  <Button variant="primary" className="button--edit">
                    Edit
                  </Button>
                  <Button variant="danger" className="button--delete">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7} className="mt-5">
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="5"
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength="5"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                onClick={handleUpdate}
                className="mt-3 me-2"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
