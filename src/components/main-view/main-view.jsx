import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //data fetching from anime-eiga API with token
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://anime-eiga-84a0980bd564.herokuapp.com/anime", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const animeFromApi = data.map((anime) => {
          return {
            _id: anime.id,
            Name: anime.Name,
            Description: anime.Description,
            imageURL: anime.imageUrl,
            Genre: anime.Genre.Name,
            Director: anime.Director.Name,
            releaseYear: anime.releaseYear,
          };
        });
        setMovies(animeFromApi);
      });
  }, [token]);

  //login and signup view displayed as the first screen for non-authenticated users
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      //Logout button added 
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setselectedMovie(null)}
        />      
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        > 
          Logout
        </button>
      </>
    );
  }
  
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    //logout button added
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setselectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
