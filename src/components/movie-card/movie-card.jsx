//extracting the onMovieClick prop
export const MovieCard = ({movie, onMovieClick}) => {
    return (
      //onClick only works on React elements, e.g. divs, buttons, p's,...
      <div onClick={() => {
        onMovieClick(movie);
      }}
      >
        {movie.title}
      </div>
  );
};


