import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MovieCard = (props) => {
  const [inWishlist, HasBeenClicked] = useState('add')
  let fullPath = ''

  if (Boolean(props.elem.poster_path)) {
    fullPath = "http://image.tmdb.org/t/p/w92" + props.elem.poster_path
  } else {
    fullPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAACDCAMAAAA3WYyQAAAAGFBMVEVMTExNTU1OTk5QUFBRUVFUVFRVVVVYWFgRkVnYAAAAyUlEQVRoge3aMQ4DIQxEUZKA9/43ToAFtsdjCeVPB8WzZCgnFVXMLEnxrMrP1+IfTRqvxt/embwWr6eXb8YAOe5Mdz4El/FivH7FeZUcEog/+KPwnJ35MLyUyp+LT/5cfJ8Pw82cnxQcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc/A/wVi30wke9LRb3SBg+ntSJ72XIWkAV42sxdxd1F76XEoNPfo3Yqc02uojx61p8fkzYyF2zLqbGFz8m7JfDe7n9C7T9MXwrj4FDAAAAAElFTkSuQmCC"

  }
  let desc = props.elem.overview
  if (desc.length > 120) {
    desc = desc.substring(0, 120) + '... [MORE]'
  }

  return <section className='container'>

    <div className='movieCard' onClick={() => {
      console.log('clicked')
    }}>
      <div className='insideElem'>
        <img src={fullPath} />
        <div className='Info'>
          <div className='topTitle'>
            <h3>{<Link to={`/project-2/components/Movie/${props.elem.id}`}>{props.elem.title}           </Link>}</h3>
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
          <h5>{desc}</h5>


        </div>
      </div>

    </div>

  </section>
}


let baseString = 'https://api.themoviedb.org/3/discover/movie?api_key=c2d70a0194571a28181621f60f9b11c4&language=en-US&sort_by=vote_count.desc&certification_country=US&include_adult=false&include_video=false&primary_release_date.lte=2020-10-28&with_original_language=en&page=1'

const Top250 = () => {
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










export default Top250
