/* extracting the passed data from MainView within the 
MovieCard component by accessing the props argument */
/* export const MovieCard = (props) => {
  return <div>{props.movie.title}</div>;
}; */

//destructure the props argument so that its properties can be accessed directly
export const MovieCard = ({movieData}) => {
    return (
      <div> {movieData.title} </div>
  );
};


