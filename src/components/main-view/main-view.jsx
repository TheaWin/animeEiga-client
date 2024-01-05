//importing useState Hook that allows to track state in a function component
import { useState } from "react";

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
      {/* 
      - `map` method is used to iterate over each item in the array 
      - "key" attribute is used to better distinguish between the similar elements in the list
        `movie.id` is used as each movie as their own unique id
      */}
      {movies.map((movie) => {
        return <div key={movie.id}>{movie.title}</div>;
      })} 
      
    </div>
  );
};

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */