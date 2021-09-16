import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Image Requests

export function getAllImages(){
  return axios.get(`${baseUrl}/images`)
}

export function getSingleImage(imageId){
  return axios.get(`${baseUrl}/images/${imageId}`)
}

export function favouriteImage(imageId, image){
  return axios.post(`/api/images/${imageId}/like/`, image, getHeaders())
}


// * Note Requests

export function getAllNotes(){
  return axios.get(`${baseUrl}/auth/profile`, getHeaders())
}

export function getSingleNote(userId, noteId){
  return axios.get(`${baseUrl}/images/${userId}/notes/${noteId}/`, getHeaders() ) 
}

export function addNote(userId, formData){
  return axios.post(`${baseUrl}/images/${userId}/notes/`, formData, getHeaders())
}

export function editNote(userId, noteId, formData){
  return axios.put(`/api/images/${userId}/notes/${noteId}/`, formData, getHeaders())
}

export function deleteNote(userId, noteId){
  return axios.delete(`${baseUrl}/images/${userId}/notes/${noteId}/`, getHeaders())
}

// * User requests

export function getUserProfile(){
  return axios.get(`${baseUrl}/auth/profile`, getHeaders())
}

export function editUserProfile(userId, formData){
  return axios.put(`${baseUrl}/auth/profile/${userId}/`, formData, getHeaders())
}

export function getUserLikedImages(imageId, likedImages){
  return axios.post(`${baseUrl}/images/${imageId}/like/`, likedImages, getHeaders())
}

// * Auth requests

export function logIn(formData){
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

export function signUp(formData){
  return axios.post(`${baseUrl}/auth/register/`, formData)
}
