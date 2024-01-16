//import PropTypes to validates the data types
import PropTypes from "prop-types";
//import Button & Card from Bootstrap
import { Button, Card } from "react-bootstrap";

//extracting the onMovieClick prop
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    //onClick only works on React elements, e.g. divs, buttons, p's,...
    <Card
      className="h-100"
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title>{movie.Name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

//define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
