import YourMovieHeader from "../items/YourMovieHeader";
import YourMovieItem from "../items/YourMovieItem";

const YourMoviesList = (props) => {
  return (
    <>
      <YourMovieHeader />
      {props.movies.map((movie) => (
        <YourMovieItem
          key={movie.id}
          id={movie.id}
          name={movie.name}
          genre={movie.genre}
          price={movie.price}
          time={movie.time}
          onRemoveMovie={props.onRemoveMovie}
          onChangeTime={props.onChangeTime}
        />
      ))}
    </>
  );
};

export default YourMoviesList;
