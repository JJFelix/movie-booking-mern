import express from 'express'
import { deleteBooking, getBookingsByID, newBooking } from '../controllers/booking-controller'

const bookingRoute = express.Router()

bookingRoute.post('/', newBooking)
bookingRoute.get('/:id', getBookingsByID)
bookingRoute.delete('/:id', deleteBooking)
export default bookingRoute