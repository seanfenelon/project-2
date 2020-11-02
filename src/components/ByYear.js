import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
today = yyyy + '-' + mm + '-' + dd

let baseString = 'https://api.themoviedb.org/3/discover/movie?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US&sort_by=primary_release_date.desc&certification_country=US&include_adult=false&include_video=false&primary_release_date.lte=2020-10-28&with_original_language=en&page=1'


let test1 = baseString.split(baseString.substring(224,234))
baseString =  test1[0] + [today] + test1[1]

console.log(baseString)

const MovieCard = (props) => {
  const [inWishlist, HasBeenClicked] = useState('add')
  let fullPath = ''
  if (Boolean(props.elem.poster_path)) {
    fullPath = "http://image.tmdb.org/t/p/w92" + props.elem.poster_path
  } else {
    fullPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAACDCAMAAAA3WYyQAAAAGFBMVEVMTExNTU1OTk5QUFBRUVFUVFRVVVVYWFgRkVnYAAAAyUlEQVRoge3aMQ4DIQxEUZKA9/43ToAFtsdjCeVPB8WzZCgnFVXMLEnxrMrP1+IfTRqvxt/embwWr6eXb8YAOe5Mdz4El/FivH7FeZUcEog/+KPwnJ35MLyUyp+LT/5cfJ8Pw82cnxQcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc/A/wVi30wke9LRb3SBg+ntSJ72XIWkAV42sxdxd1F76XEoNPfo3Yqc02uojx61p8fkzYyF2zLqbGFz8m7JfDe7n9C7T9MXwrj4FDAAAAAElFTkSuQmCC"
  }
  return <section className='container'>

    <div className='movieCard' onClick={() => {
      console.log('clicked')
    }}>
      <div className='insideElem'>
        <img src={fullPath} />
        <Link to={`/project-2/components/Movie/${props.elem.id}`}>
        <h3>{props.elem.release_date} ||| {props.elem.title} </h3>
        </Link>
      </div>
      <button className='AddToWishList' onClick={() => {
        console.log(props.elem.id)
        if (!localStorage.getItem('MovieWishList')) {
          localStorage.setItem('MovieWishList', JSON.stringify([]))
        }
        let test = JSON.parse(localStorage.getItem('MovieWishList'))
        test.push(props.elem.id)
        console.log(test)
        localStorage.setItem('MovieWishList', JSON.stringify(test))
        // localStorage.setItem('MovieWishList', test).push(props.elem.id))
      }}>{inWishlist}</button>
    </div>
  </section>
}


const ByYear = () => {
  const [NewReleases, updateNewReleases] = useState([])
  const [page, newpage] = useState(false)
  const [imgInfo, retrieveImgInfo] = useState([])

  function newPage(dir) {
    const address = baseString
    let newAddress = address.split('page=')[0]
    let pgNumber = address.split('page=')[1]

    if (dir === 'next') {
      pgNumber = (Number(pgNumber) + 1).toString()
    }
    if (pgNumber > 1) {
      if (dir === 'prev') {
        pgNumber = (Number(pgNumber) - 1).toString()
      }
    }
    newAddress = newAddress + 'page=' + pgNumber
    baseString = newAddress
  }




  useEffect(() => {
    axios.get(baseString)
      .then(resp => {
        updateNewReleases(resp.data.results)
      })
  }, [page])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/configuration?api_key=c2d70a0194571a28181621f60f9b11c4')
      .then(resp => {
        retrieveImgInfo(resp.data.images)
      })
  }, [])


  return <div>  {console.log(NewReleases[0])}
    <section className='cardList'>
      {NewReleases.map((elem, index) => <MovieCard elem={elem} key={index}></MovieCard>)}

    </section>
    <div className='buttons'>
      <button onClick={() => {
        newPage('prev')
        newpage(!page)
      }}>Previous Page </button>
      <button onClick={() => {
        newPage('next')
        newpage(!page)
      }}>Next Page </button>
    </div>


  </div>
}







export default ByYear
