import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const MovieCard = (props) => {
  let fullPath = ''
  if (Boolean(props.elem.poster_path)) {
    fullPath = "http://image.tmdb.org/t/p/w200" + props.elem.poster_path
  } else {
    fullPath = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD0CPRYsjGxVD5H16glQP7mfAAhS6Ut0nndA&usqp=CAU"
  }

  // </div>
  return <div className="container">
    <Link to={`/project-2/components/Movie/${props.elem.id}`}>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <h2 className="title is-4">
                {props.elem.title}
              </h2>
              <p className="subtitle is-4">
                ({Boolean(props.elem.release_date) ? props.elem.release_date.split('-')[0] : props.elem.name})
              </p>
            </div>
          </div>
        </div>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={fullPath} alt={props.elem.title} />
          </figure>
        </div>
      </div>
    </Link>
  </div>


}
const Movie = (props) => {


  const movieId = props.match.params.movieId
  const [movie, updateMovie] = useState({})
  const [movieDB2, updateMovieDB2] = useState({})
  const [similar, updateSimilar] = useState([])



  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=55bdb5e5f4a69011d678c632348744a5`)
      updateMovie(data)
      const { data: extraData } = await axios.get(`https://www.omdbapi.com/?apikey=554b29f0&i=${data.imdb_id}`)
      updateMovieDB2(extraData)
      const { data: similarMovies } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=55bdb5e5f4a69011d678c632348744a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${data.genres[0].id}&page=1`)
      updateSimilar(similarMovies.results)


    }
    fetchData()

  }, [movieId])

  if (!movie.title || !similar) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }

  return <div className="columns">



    <div className="column">

    <section className="hero is-large  has-background ">
        <img className="hero-background is-transparent " src={"http://image.tmdb.org/t/p/original" + movie.backdrop_path} alt="backdrop"></img>
        </section>
      <h1 className="title has-text-light">{movie.title}</h1>
      
      <img className="posterIMG" src={"http://image.tmdb.org/t/p/w300" + movie.poster_path} alt={movie.title} />
      
      <h2 className="subtitle has-text-light">{movie.overview}</h2>
      <h2 className="subtitle has-text-light">{movieDB2.Rated}</h2>
      <h2 className="subtitle has-text-light">{movieDB2.Year}</h2>
      <h2 className="subtitle has-text-light">{movieDB2.Directior}</h2>
      <h2 className="subtitle has-text-light">{movieDB2.Actors}</h2>
      <h2 className="subtitle has-text-light">Runtime: {movie.runtime} mins</h2>
      <h2 className="subtitle has-text-light">{movieDB2.Genre}</h2>
      
      




    </div>

    <div className="column is-one-fifth">

      <div className="container">
        {Boolean(similar[0]) ? (similar.splice(15)).map((elem, index) => <MovieCard elem={elem} key={index}></MovieCard>) : console.log('failed')}
      </div>
    </div>
  </div>
}







export default Movie
