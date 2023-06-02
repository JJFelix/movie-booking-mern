import express from 'express'
import { addUser, deleteUser, getAllUsers, getBookingsOfUser, login, updateUser } from '../controllers/user-controllers'

const userRoute = express.Router()

userRoute.get('/', getAllUsers)
userRoute.post('/signup', addUser)
userRoute.put('/:id', updateUser)
userRoute.delete('/:id', deleteUser)
userRoute.post('/login', login)
userRoute.get('/bookings/:id', getBookingsOfUser)

export default userRoute