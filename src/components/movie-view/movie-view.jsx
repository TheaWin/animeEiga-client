export const MovieView = ({movie}) => {
  return (
    <div>
      <div>
        <img src="{movie.imageURL}" alt="anime cover"/>
      </div>
      <div>
        <span>Title: </span>
        <h1>{movie.Name}</h1>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Duration: </span>
        <span>{movie.Duration}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.releaseYear}</span>
      </div>
    </div>
  );
};