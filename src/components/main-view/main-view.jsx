//importing useState Hook that allows to track state in a function component
//importing useEffect Hook that runs a callback function
import { useState, useEffect } from "react";

//import MovieCard & MovieView component to be used
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//import LoginView component
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

//import Navbar
import { NavigationBar } from "../navigation-bar/navigation-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import for implementing client-side routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

//export MainView (main homepage) to be used
export const MainView = () => {
  //use the data from localStorage as the default value
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  /* using useState to add a state variable to the component with the following syntax:
    const [currentState, functionUsedToChangeState ] = useState([]); */
  const [movies, setMovies] = useState([]);
  //initial value of user is set as storedUser. if not, null
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //initial value of user is set as storedToken. if not, null
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //fetching data from API by using useEffect hook
  useEffect(
    () => {
      //if there's no token, doesn't proceed with the fetch operation
      if (!token) {
        return;
      }

      fetch("https://anime-eiga-84a0980bd564.herokuapp.com/anime", {
        //authentication used as server expects a valid token to grant acess
        headers: { Authorization: `Bearer ${token}` },
      })
        //parsed the response as JSON
        .then((response) => response.json())
        //processes the JSON result to return a new data array with specific properties
        .then((data) => {
          const animeFromApi = data.map((anime) => {
            return {
              _id: anime._id,
              Name: anime.Name,
              Description: anime.Description,
              imageURL: anime.imageURL,
              Genre: anime.Genre,
              Director: anime.Director,
              releaseYear: anime.releaseYear,
              Duration: anime.Duration,
            };
          });
          //update the state variable `movies`
          setMovies(animeFromApi);
        });
    },
    [token] //dependency array in which the fetch operation is triggered when the `token` changes
  );

  return (
    //Wrapper for client-side routing
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
        }}
      />
      <Row className="justify-content-md-center">
        {/* Route Configurations */}
        <Routes>
          {/* Route for signup */}
          <Route
            path="/signup"
            element={
              <>
                {/* If user is logged in, navigate to home; otherwise, render SignupView */}
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          {/* Route for login */}
          <Route
            path="/login"
            element={
              <>
                {/* If user is logged in, navigate to home; otherwise, render LoginView */}
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          {/* Route for individual movie view */}
          <Route
            path="/anime/:movieId"
            element={
              <>
                {/* If user is not logged in, navigate to login; otherwise, render MovieView or show empty list message */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty! </Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          {/* Home view or Default route */}
          <Route
            path="/"
            element={
              <>
                {/* If user is not logged in, navigate to login; otherwise, render MovieCard list or show empty list message */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          {/* Route for USER PROFILE view */}
          <Route
            path="/user"
            element={
              <>
                {/* If user is not logged in, navigate to login; otherwise, render MovieView or show empty list message */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */
