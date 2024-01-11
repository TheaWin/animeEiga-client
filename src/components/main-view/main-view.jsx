//importing useState Hook that allows to track state in a function component
//importing useEffect Hook that runs a callback function
import { useState, useEffect } from "react";

//import MovieCard & MovieView component to be used
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//import LoginView component
import { LoginView } from "../login-view/login-view";

//export MainView (main homepage) to be used
export const MainView = () => {

  /* using useState to add a state variable to the component with the following syntax:
    const [currentState, functionUsedToChangeState ] = useState([]); */
  const [movies, setMovies] = useState([]);
  //initial value of selectedMovie is set as null
  const [selectedMovie, setSelectedMovie] = useState(null);
  //initial value of user is set as null
  const [user,setUser] = useState(null);
  //initial value of token is set as null
  const [token, setToken] = useState (null);


  //fetching data from API by using useEffect hook
  useEffect(() => {
    //if there's no token, doesn't proceed with the fetch operation
    if(!token) {
      return;
    }

    fetch ("https://anime-eiga-84a0980bd564.herokuapp.com/anime", {
      //authentication used as server expects a valid token to grant acess
      headers: {Authorization: `Bearer ${token}`}
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
            duration: anime.duration,
          };
        });
        //update the state variable `movies`
        setMovies(animeFromApi);
      });
  }, [token]//dependency array in which the fetch operation is triggered when the `token` changes
  );

  //LoginView is displayed when no user is logged in
  if (!user) {
    return <LoginView 
      //callback function pass as a prop from a parent component to a child component
      onLoggedIn ={(user,token) => {
        setUser(user);
        setToken(token);
      }} />;
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