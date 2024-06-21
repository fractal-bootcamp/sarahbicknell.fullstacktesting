import { useState , useEffect} from 'react'
import './App.css'

function Movies() {
//initialize state variable to hold movies
  const [movies, setMovies] = useState([])

//function thtat fetches movies from the server
  const fetchMovies  = async () => {
    try {
      const response = await fetch('http://localhost:5050/movies') //making get req to the server
      const data = await response.json(); // parse the response json data
      setMovies(data) //set movies variable to the returned data
    } catch(error){
      console.log('Error fetching movies', error)
    }
  }

// this will run the function to make the get request when the component mounts, with dep array empty so it only happens once 
  useEffect(()=> {
    fetchMovies()
  }, [])


  return (
    <div>
      <p> List of Movies </p>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div> 
  )
}

export default Movies
