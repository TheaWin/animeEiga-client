//import PropTypes to validates the data types
import PropTypes from "prop-types";

//extracting the onMovieClick prop
export const MovieCard = ({movie, onMovieClick}) => {
    return (
      //onClick only works on React elements, e.g. divs, buttons, p's,...
      <div onClick={() => {
        onMovieClick(movie);
      }}
      >
        {movie.Name}
      </div>
  );
};

//define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
