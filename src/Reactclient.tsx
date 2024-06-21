import MovieList from './components/MovieList'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


function Header() {
  return (
    <header>
      <h1>Flickser</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/movies">Movies</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer> 
      <p> Created with ♡ by Disco </p>
    </footer>
  )
}

export default function App() {
  return(
    <Router>
      <Header /> 
        <Routes> 
          <Route path='/' element={<MovieList />} /> 
        </Routes>
      <Footer /> 
    </Router>
  )
}