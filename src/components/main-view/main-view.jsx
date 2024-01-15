//importing useState Hook that allows to track state in a function component
//importing useEffect Hook that runs a callback function
import { useState, useEffect } from "react";

//import MovieCard & MovieView component to be used
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//import LoginView component
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { NavBar } from "../nav-bar/nav-bar";

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
  const [user,setUser] = useState(storedUser? storedUser : null);
  //initial value of user is set as storedToken. if not, null
  const [token, setToken] = useState (storedToken ? storedToken : null);
  //initial value of showSignup set as false as it will be hidden
  const [showSignup, setShowSignup] = useState(false);


  //fetching data from API by using useEffect hook
  useEffect(() => {
    //if there's no token, doesn't proceed with the fetch operation
    if(!token) {
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
            Genre: anime.Genre.Name,
            Director: anime.Director.Name,
            releaseYear: anime.releaseYear,
          };
        });
        //update the state variable `movies`
        setMovies(animeFromApi);
      });
  }, [token]//dependency array in which the fetch operation is triggered when the `token` changes
  );

  //LoginView is displayed when no user is logged in
  if (!user) {
    //LoginView is set to be displayed when showSignup is set as false
    if(!showSignup) {
      return (
        <>
          <NavBar />
          <LoginView
            onLoggedIn={(user,token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div>
            <span>No Account?</span>
            {/* Link to toggle SignupView component */}
            <a href="#" onClick={() => setShowSignup(true)}>
              Sign Up
            </a>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          {/* SignupView is set to displayed when there is no user and ShowSignup is set as true */}
          <SignupView
            onSignedUp = {() => {
              setShowSignup(false);
          }} />
          <div>
            <span>Already have an account?</span>
            {/* Link to toggle LoginView component */}
            <a href="#" onClick={() => setShowSignup(false)}>
              Log In
            </a>
          </div>
        </>
      );
    }
  }

  if (selectedMovie) {
    return <MovieView 
      movie={selectedMovie} 
      //by assigning null to selectedMovie, the if condition will return false, thus stop rendering MovieView
      onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <NavBar />
      {movies.map((movie) => (
        <MovieCard 
        key={movie.id}
        // custom attribute is added to pass the data to a child component, aka, props
        movie={movie}
        //to add onClick to a component, a function is passed as a prop called onMovieClick
        onMovieClick = {(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
      {/* Logout button */}
      <button onClick={() => {setUser(null);setToken(null);}}>
        Logout
      </button>
    </div>
  );
};

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */