import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

let baseString = 'https://api.themoviedb.org/3/discover/movie?api_key=55bdb5e5f4a69011d678c632348744a5&language=en-US&page=1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28'

const MovieCard = (props) => {
  let fullPath = ''
  if (Boolean(props.elem.poster_path)) {
    fullPath = "http://image.tmdb.org/t/p/w200" + props.elem.poster_path
  } else {
    fullPath = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD0CPRYsjGxVD5H16glQP7mfAAhS6Ut0nndA&usqp=CAU"
  }
  
  // </div>
  return <div className="column is-one-third-desktop is-half-tablet is-half-mobile">
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

const Genre = () => {
  const [movies, updateMovies] = useState([])
  const [selectedGenre, updateSelectedGenre] = useState('')
  const [selectedGenreId, updateSelectedGenreId] = useState('')
  const [selected, updateSelected] = useState(false)
  const [imgInfo, retrieveImgInfo] = useState([])
  // const [page, newpage] = useState(false)
  // const [imgConstructor, createImg] = useState('')
  const genres = [
    {
      'id': 28,
      'name': 'Action'
    },
    {
      'id': 12,
      'name': 'Adventure'
    },
    {
      'id': 16,
      'name': 'Animation'
    },
    {
      'id': 35,
      'name': 'Comedy'
    },
    {
      'id': 80,
      'name': 'Crime'
    },
    {
      'id': 99,
      'name': 'Documentary'
    },
    {
      'id': 18,
      'name': 'Drama'
    },
    {
      'id': 10751,
      'name': 'Family'
    },
    {
      'id': 14,
      'name': 'Fantasy'
    },
    {
      'id': 36,
      'name': 'History'
    },
    {
      'id': 27,
      'name': 'Horror'
    },
    {
      'id': 10402,
      'name': 'Music'
    },
    {
      'id': 9648,
      'name': 'Mystery'
    },
    {
      'id': 10749,
      'name': 'Romance'
    },
    {
      'id': 878,
      'name': 'Science Fiction'
    },
    {
      'id': 10770,
      'name': 'TV Movie'
    },
    {
      'id': 53,
      'name': 'Thriller'
    },
    {
      'id': 10752,
      'name': 'War'
    },
    {
      'id': 37,
      'name': 'Western'
    }
  ]
  

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(baseString)
      updateMovies(data.results)
    }
    if (selected) {
      fetchMovies()
      updateSelected(false)
    }
  }, [selected])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/configuration?api_key=c2d70a0194571a28181621f60f9b11c4')
      .then(resp => {
        retrieveImgInfo(resp.data.images)
      })
  }, [selected])

  function newPage(dir) {
 
    const address = baseString
    const newAddress = address.split('&')
    console.log(newAddress)
    let pgNumber = newAddress[2].split('page=')[1]
    if (dir === 'reset') {
      pgNumber = '1'
    }
    if (dir === 'next') {
      pgNumber = (Number(pgNumber) + 1).toString()
    }
    if (pgNumber > 1) {
      if (dir === 'prev') {
        pgNumber = (Number(pgNumber) - 1).toString()
      }
    }
    newAddress[2] = 'page=' + pgNumber
    baseString = newAddress.join().replaceAll(',', '&')
    updateSelected(!selected)
    // newAddress = newAddress + 'page=' + pgNumber
    // baseString = newAddress
  }
  
  function newGenre(genreId) {
    const address = baseString
    const newAddress = address.split('&')

    newAddress[newAddress.length - 1] = 'with_genres=' + genreId
    baseString = newAddress.join().replaceAll(',', '&')
  }

  return <div className="containerGenre">
    <div className="blockGenre">
      <div className="column is-multiline is-mobile">
        {genres.map((genre, index) => {
          return <button onClick={() => {
            updateSelectedGenre(genre.name); updateSelectedGenreId(genre.id); updateSelected(!selected); newGenre(genre.id);
          }} 
          className="button is-success is-rounded is-large genreButton" key={index}>{genre.name}
          </button>
        })}
      </div>
    </div>
    
  
    <div className="columns is-one-quarter is-multiline">
      
      {movies.map((elem, index) => <MovieCard elem={elem} key={index}></MovieCard>)}
  
    </div>

    <div className="buttons">
      <button  className="button is-info is-rounded" onClick={() => {

        newPage('prev')
        updateSelected(!selected)
      }}>Previous Page </button>
      <button className="button is-info is-rounded" onClick={() => {
        newPage('next')
        updateSelected(!selected)
      }}>Next Page </button>
      <h3>Page {baseString.split('&')[2].split('page=')[1]}</h3>

    </div>


  </div>


}







export default Genre
