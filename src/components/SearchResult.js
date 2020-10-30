import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


let baseString = 'https://api.themoviedb.org/3/search/movie?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US&page=1&include_adult=false&query=Potter'




const SearchResult = () => {
  const [search, updateSearch] = useState('')
  const [results, updateResults] = useState([])
  const [page, newpage] = useState(false)
  const [imgInfo, retrieveImgInfo] = useState([])
  const [imgConstructor, createImg] = useState('')
  const [searchFor, setSearchFor] = useState('movies')
  const [movieActive, setMovieActive] = useState('active')
  const [peopleActive, setPeopleActive] = useState('inactive')
  const [searchParameter, changeSearchParameter] = useState('movies')
  const [inWishlist, HasBeenClicked] = useState('add')





  const MovieCard = (props) => {

    let fullPath = ''
    if (Boolean(props.elem.poster_path)) {
      fullPath = "http://image.tmdb.org/t/p/w92" + props.elem.poster_path
    } else {
      if (Boolean(props.elem.profile_path)) {
        console.log('Test', props.elem.profile_path)
        fullPath = "http://image.tmdb.org/t/p/w92" + props.elem.profile_path
      } else {

        fullPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAACDCAMAAAA3WYyQAAAAGFBMVEVMTExNTU1OTk5QUFBRUVFUVFRVVVVYWFgRkVnYAAAAyUlEQVRoge3aMQ4DIQxEUZKA9/43ToAFtsdjCeVPB8WzZCgnFVXMLEnxrMrP1+IfTRqvxt/embwWr6eXb8YAOe5Mdz4El/FivH7FeZUcEog/+KPwnJ35MLyUyp+LT/5cfJ8Pw82cnxQcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc/A/wVi30wke9LRb3SBg+ntSJ72XIWkAV42sxdxd1F76XEoNPfo3Yqc02uojx61p8fkzYyF2zLqbGFz8m7JfDe7n9C7T9MXwrj4FDAAAAAElFTkSuQmCC"
      }
    }
    return <section className='container'>

      <div className='movieCard' onClick={() => {
        console.log('clicked')
      }}>
        {console.log("CHECKING", searchFor)}
        <div className='insideElem'>


          <img src={fullPath} />
          <Link to={`/project-2/components/Movie/${props.elem.id}`}>
            <h3>{props.elem.title}</h3>
          </Link>
          <div> {props.elem.release_date ? <h3>({props.elem.release_date.split('-')[0]})</h3> : <h3>{props.elem.name}</h3>}</div>



        </div>
        <div className='rightSide'>
          {props.elem.release_date ? <h3 id='rating'>{props.elem.vote_average}/10</h3> : <h3></h3>}

          {props.elem.release_date ?           <button className='AddToWishList' onClick={() => {
            console.log(props.elem.id)
            if (!localStorage.getItem('MovieWishList')) {
              localStorage.setItem('MovieWishList', JSON.stringify([]))
            }
            let test = JSON.parse(localStorage.getItem('MovieWishList'))
            test.push(props.elem.id)
            console.log(test)
            localStorage.setItem('MovieWishList', JSON.stringify(test))
            // localStorage.setItem('MovieWishList', test).push(props.elem.id))
          }}>{inWishlist}</button> : <h2></h2>}

        </div>
        {/* <h2>{props.img.images.base_url + props.img.images.logo_sizes[2] + props.elem.poster_path}</h2> */}

      </div>

    </section >



  }


  useEffect(() => {
    axios.get(baseString)
      .then(resp => {
        updateResults(resp.data.results)
      })
  }, [page])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/configuration?api_key=c2d70a0194571a28181621f60f9b11c4')
      .then(resp => {
        retrieveImgInfo(resp.data.images)
      })
  }, [])



  function runNewSearch(str) {

    console.log("WHAT R WE LOOKIN FOR?", searchFor)
    if (searchFor === 'movies') {
      baseString = "https://api.themoviedb.org/3/search/movie?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US&page=1&include_adult=false&query=Narnia"
    }
    if (searchFor === 'people') {
      baseString = "https://api.themoviedb.org/3/search/person?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US&page=1&include_adult=false&query=John"
    }
    const address = baseString
    const newAddress = address.split('&')


    newAddress[newAddress.length - 1] = 'query=' + str
    baseString = newAddress.join().replaceAll(',', '&')
    // baseString = newAddress[0] + 'query=' + newAddress[1]
  }



  function newPage(dir) {
    const address = baseString
    const newAddress = address.split('&')
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
    // newAddress = newAddress + 'page=' + pgNumber
    // baseString = newAddress
  }

  return <div>
    <div className='SearchItems'>
      <input onChange={(event) => {
        updateSearch(event.target.value)
      }}></input>
      <button className='confirm' onClick={() => {

        runNewSearch(search)

        newPage('reset')

        newpage(!page)
      }}>Search?</button>
    </div>
    <button className={movieActive} id='filterButton' onClick={() => {
      setPeopleActive('inactive')
      setMovieActive('active')
      if (searchFor === 'people') {
        changeSearchParameter('movies')
        setSearchFor('movies')
      }

    }}>Movies</button>
    <button className={peopleActive} id='filterButton' onClick={() => {
      setMovieActive('inactive')
      setPeopleActive('active')
      if (searchFor === 'movies') {
        changeSearchParameter('people')
        setSearchFor('people')
      }

    }}>People</button>
    {results.map((elem, index) => <MovieCard elem={elem} key={index} imgBase={imgInfo.base_url} imgSize={imgInfo.logo_sizes}></MovieCard>)}
    <div className='buttons'>
      <button onClick={() => {
        newPage('prev')
        newpage(!page)
      }}>Previous Page </button>
      <button onClick={() => {
        newPage('next')
        newpage(!page)
      }}>Next Page </button>
      <h3>Page {baseString.split('&')[2].split('page=')[1]}</h3>
    </div>


  </div>
}







export default SearchResult


