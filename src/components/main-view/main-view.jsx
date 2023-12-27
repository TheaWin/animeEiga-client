import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  //
  useEffect(() => {
    fetch("https://anime-eiga-84a0980bd564.herokuapp.com/anime")
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
            releaseYear: anime.releaseYear
          };
        });
        setMovies(animeFromApi);
      })
  }, []);

  const [selectedMovie, setselectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setselectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
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
    </div>
  );
};