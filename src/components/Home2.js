import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {


  return <div>
    {/* <h1>The Movie Guru</h1> */}
    


 
    

  

    <section className="hero is-light is-large">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            THE MOVIE GURU
          </h1>
        </div>
      </div>
    </section>

    

    <section className='HomeButtons'>
    <h2>
     <Link className="toSearch" to='/project-2/components/SearchResult'><button>Search Results</button></Link>
      </h2>

    <h2>
      <Link className="toGenre" to='/project-2/components/Genre'><button>Search By Genre</button></Link>
      </h2>
      <h2>
        <Link className="toByYear" to='/project-2/components/ByYear'><button>Search By Year</button></Link>
      </h2>
      <h2>
      <Link className="toTop250" to='/project-2/components/Top250'><button>Top Rated</button></Link>
     </h2>
    </section> 
     </div>
   
}







export default Home
