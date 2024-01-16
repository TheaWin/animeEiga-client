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
import { NavBar } from "../Nav-bar/nav-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//export MainView (main homepage) to be used
export const MainView = () => {
  //use the data from localStorage as the default value
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  /* using useState to add a state variable to the component with the following syntax:
    const [currentState, functionUsedToChangeState ] = useState([]); */
  const [movies, setMovies] = useState([]);
  //initial value of selectedMovie is set as null
  const [selectedMovie, setSelectedMovie] = useState(null);
  //initial value of user is set as storedUser. if not, null
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //initial value of user is set as storedToken. if not, null
  const [token, setToken] = useState(storedToken ? storedToken : null);
  //
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  //fetching data from API by using useEffect hook
  useEffect(() => {
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
              _id: anime.id,
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
    <Row className="justify-content-md-center">
      {!user ? (
        !showSignup ? (
          <>
            <NavBar />
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              <div>
                <span>No Account?</span>
                <a href="#" onClick={() => setShowSignup(true)}>
                  Sign Up
                </a>
              </div>
            </Col>
          </>
        ) : (
          <>
            <NavBar />
            <Col md={5}>
              <SignupView
                onSignedUp={() => {
                  setShowSignup(false);
                }}
              />
              <div>
                <span>Already have an account?</span>
                <a href="#" onClick={() => setShowSignup(false)}>
                  Log In
                </a>
              </div>
            </Col>
          </>
        )
      ) : selectedMovie ? (
        <>
          {/* setUser & setToken set as null for logout button */}
          <NavBar
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
            }}
          />
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              //by assigning null to selectedMovie, the if condition will return false, thus stop rendering MovieView
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <NavBar
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
            }}
          />
          {movies.map((movie) => (
            <Col key={movie.id} md={3} className="mb-5">
              <MovieCard
                // custom attribute is added to pass the data to a child component, aka, props
                movie={movie}
                //to add onClick to a component, a function is passed as a prop called onMovieClick
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */
