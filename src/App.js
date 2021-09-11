import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserProfile from './components/user/UserProfile'

import Moodboard from './components/images/Moodboard'

import NotesIndex from './components/notes/NotesIndex'
import NoteShow from './components/notes/NoteShow'
import NoteNew from './components/notes/NoteNew'
import NoteEdit from './components/notes/NoteEdit'

function App() {

  return (

    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/moodboard">
          <Moodboard />
        </Route>
        <Route path="notes/new">
          <NoteNew />
        </Route>
        <Route path="/notes/:noteId/edit">
          <NoteEdit />
        </Route>
        <Route path="/notes/:noteId">
          <NoteShow />
        </Route>
        <Route path="/notes">
          <NotesIndex />
        </Route>
        <Route path="/signup" >
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/:userId">
          <UserProfile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>

  )



  


  
}

export default App
