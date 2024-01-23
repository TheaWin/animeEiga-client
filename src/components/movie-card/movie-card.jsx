import React from "react";
//import PropTypes to validates the data types
import PropTypes from "prop-types";
//import Button & Card from Bootstrap
import { Card } from "react-bootstrap";

//navigational links for client-side routing
import { Link } from "react-router-dom";

//extracting the onMovieClick prop
export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/anime/${encodeURIComponent(movie._id)}`}>
      <Card className="h-100" variant="link" style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.Name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

//define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
