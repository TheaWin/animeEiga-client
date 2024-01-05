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
  );
};

//different export syntax
/* const MainView = () => {
  ...
}
export MainView; */