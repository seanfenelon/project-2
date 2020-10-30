import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className="navbar1">
    <img className="logo" src='https://boundarydevices.com/wp-content/uploads/2017/01/movie-icon.png'/>

    <Link to='/'><button className="ToHome" >Home</button></Link>
    <Link to='/project-2/components/WatchList'><button className="ToWatchList" >Watch List</button></Link>

  </nav>
}

export default Navbar