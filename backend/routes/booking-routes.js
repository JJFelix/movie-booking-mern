import express from 'express'
import { deleteBooking, getAllBookings, getBookingsByID, newBooking } from '../controllers/booking-controller'

const bookingRoute = express.Router()

bookingRoute.post('/', newBooking)
bookingRoute.get('/', getAllBookings)
bookingRoute.get('/:id', getBookingsByID)
bookingRoute.delete('/:id', deleteBooking)
export default bookingRoute