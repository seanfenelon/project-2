import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

let listArray = JSON.parse(localStorage.getItem('MovieWishList'))

console.log(localStorage.getItem('MovieWishList'))

const getMovieCollectionPromises = (movieArray) => {
  //return [{title: "a"}, {title: "b"}, {title: 'c'}]
  const promises = movieArray.map(id => axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US`))
  return Promise.all(promises);

  // updateResults(resp.data)
  // if (element !== movieArray.length - 1) {
  //   updateElement(element + 1)
  //   arrayTest.push('helo')

  // }

}

const MovieCard = (props) => {
  let fullPath = ''
  if (Boolean(props.elem.poster_path)) {
    fullPath = "http://image.tmdb.org/t/p/w92" + props.elem.poster_path
  } else {
    fullPath = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD0CPRYsjGxVD5H16glQP7mfAAhS6Ut0nndA&usqp=CAU"
  }
  return <section className='container'>

    <div className='movieCard' onClick={() => {
      console.log('clicked')
    }}>
      <div className='insideElem'>
        <img src={fullPath} />
        <h3>{props.elem.release_date} ||| {props.elem.title} </h3>
      </div>
    </div>
  </section>
}

const WatchList = () => {
  let listArray = JSON.parse(localStorage.getItem('MovieWishList'))
  const [movieCollection, setMovieCollection] = useState([]);
  if (listArray) {

    useEffect(() => {

      getMovieCollectionPromises(listArray).then(data => {
        let movieCollection = []
        data.forEach(movieData => movieCollection.push(movieData.data))
        setMovieCollection(movieCollection);
      });
      //console.log('globalMovie Collection', movieCollection)
    }, [])

    return (
      <section className="WatchList">
        {/* {console.log('movieCollection inside render', movieCollection)} */}
        {/* <h3>{ Boolean(movieCollection.length) ? movieCollection.map(data => (<p key={data.title}>{data.title}</p>)) : "Loading"}</h3> */}
        {movieCollection.map((elem, index) => <MovieCard elem={elem} key={index}></MovieCard>)}
        <button onClick={() => {
          localStorage.clear('MovieWishList')
        }}>Clear</button>
      </section>);
  } else {
    return <h2>Add some movies to your watchlist!</h2>
  }
  // setInterval(() => {
  //   console.log(movieCollection)
  // }, 1000);

  // for (let i = 0; i < movieArray.length; i++) {
  //   updateElement(element + 1)
  // }

  // getStrings()
  // console.log(results.title)
  // console.log(arrayTest)
  // arrayTest.push(results)
  // console.log("HERE", arrayTest)

  // }


}

export default WatchList