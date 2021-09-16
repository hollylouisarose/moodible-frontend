import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import SecureRoute from './components/common/SecureRoute'

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
        <SecureRoute path="/images/:imageId">
          <ImageShow />
        </SecureRoute>
        <SecureRoute path="/choosemood">
          <MoodboardChoice />
        </SecureRoute>
        <SecureRoute path="/moodboard/:moodId">
          <Moodboard />
        </SecureRoute>
        <Route path="/about">
          <About />
        </Route>
        <SecureRoute path="/notes/new">
          <NoteNew />
        </SecureRoute>
        <SecureRoute path="/notes/:noteId/edit">
          <NoteEdit />
        </SecureRoute>
        <SecureRoute path="/notes/:noteId">
          <NoteShow />
        </SecureRoute>
        <SecureRoute path="/:userId/notes">
          <NotesIndex />
        </SecureRoute>
        <SecureRoute path="/:userId/edit">
          <EditProfile />
        </SecureRoute>
        <Route path="/:userId">
          <UserProfile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>

  )

}

export default App
