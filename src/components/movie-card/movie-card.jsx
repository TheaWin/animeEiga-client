import PropTypes from "prop-types";
import {Button,Card} from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    //Bootstrap components
    <Card onClick={() => onMovieClick(movie)} style={{cursor:"pointer"}}>
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title>{movie.Name}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
    </Card>

    //JSX elements
    /* <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Name}
    </div> */
  );
};

//define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};