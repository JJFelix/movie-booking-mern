import express from 'express'
import { addMovie, getAllMovies, getMovieByID } from '../controllers/movie-controller'

const movieRoute = express.Router()

movieRoute.post('/',addMovie )
movieRoute.get('/',getAllMovies)
movieRoute.get('/:id', getMovieByID)

export default movieRoute