import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'



import Home from './components/Home'
import FilterResult from './components/FilterResult'
import Movie from './components/Movie'
import SearchResult from './components/SearchResult'

import ByYear from './components/ByYear'
import Top250 from './components/Top250'
import Genre from './components/Genre'

import Navbar from './components/Navbar'
import WatchList from './components/WatchList'

import './styles/style.scss'
import 'bulma'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>

      <Route exact path="/project-2/" component={Home} />
      <Route exact path="/project-2/components/FilterResult" component={FilterResult} />
      <Route exact path="/project-2/components/Movie/:movieId" component={Movie} />
      <Route exact path="/project-2/components/SearchResult" component={SearchResult} />

      <Route exact path="/project-2/components/ByYear" component={ByYear} />
      <Route exact path="/project-2/components/Genre" component={Genre} />
      <Route exact path="/project-2/components/Top250" component={Top250} />
      <Route exact path="/project-2/components/WatchList" component={WatchList} />
    </Switch>
  </BrowserRouter>
)

// const Home = () => {
//   return <h1>Hello world</h1>
// }

export default App