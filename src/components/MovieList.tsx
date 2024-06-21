import { Fragment, useState , useEffect} from 'react'
import '../App.css'
import { Movie } from '@prisma/client';


//function thtat fetches movies from the server
const fetchMovies  = async () => {
  try {
    const response = await fetch('http://localhost:5050/movies') //making get req to the server
    const data: Movie[] = await response.json(); // parse the response json data
    return data

  } catch(error){
    console.error('Error fetching movies')
    throw (error)
  }
}




function MovieList() {
//initialize state variable to hold movies
  const [movies, setMovies] = useState<Movie[] | "loading">("loading")

// this will run the function to make the get request when the component mounts, with dep array empty so it only happens once 
  useEffect(()=> {
    const getMovies = async () => {
      const data = await fetchMovies()
      setMovies(data)
    }
    getMovies()
  }, [])


  return (
    <div>
      {/* Displaying loading if movie fetch hasnt finished, then movies or a message about no movies being retrieved */}
      {movies === "loading" 
         ? "Loading..."
         : movies.length === 0
            ? "No movies to render"
            : <div>
                <p> List of Movies </p>
                <ul>
                  {movies.map(movie => (
                  <Fragment key={movie.id}>
                  <li>{movie.title}</li>
                  <li>{movie.description}</li>
                  </Fragment>
                        ))}
                </ul>
            </div>}
    </div> 
  )
}

export default MovieList