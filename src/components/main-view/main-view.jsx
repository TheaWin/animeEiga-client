//importing useState Hook that allows to track state in a function component
import { useState } from "react";

//import MovieCard component to be used
import { MovieCard } from "../movie-card/movie-card";

//export MainView (main homepage) to be used
export const MainView = () => {

  /* using useState to add a state variable to the component with the following syntax:
    const [currentState, functionUsedToChangeState ] = useState([]); */
  const [movies, setMovies] = useState([]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard />
      ))} 
      
    </div>
  );
};

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */