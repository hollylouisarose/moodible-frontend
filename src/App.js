import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'

import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import UserProfile from './components/user/UserProfile'
import EditProfile from './components/user/EditProfile'
import About from './components/common/About'

import Moodboard from './components/images/Moodboard'
import MoodboardChoice from './components/images/MoodboardChoice'
import ImageShow from './components/images/ImageShow'

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/images/:imageId">
          <ImageShow />
        </Route>
        <Route path="/choosemood">
          <MoodboardChoice />
        </Route>
        <Route path="/moodboard/:moodId">
          <Moodboard />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/notes/new">
          <NoteNew />
        </Route>
        <Route path="/notes/:noteId/edit">
          <NoteEdit />
        </Route>
        <Route path="/notes/:noteId">
          <NoteShow />
        </Route>
        <Route path="/:userId/notes">
          <NotesIndex />
        </Route>
        <Route path="/:userId/edit">
          <EditProfile />
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
