import Bookings from "../models/Bookings"
import Movie from "../models/Movie"
import User from "../models/User"
import mongoose from "mongoose"

export const newBooking = async (req,res,next)=>{
    const {movie, date, seatNumber, user} = req.body

    //validate movies and users
    let existingMovie
    let existingUser

    try {
        existingMovie = await Movie.findById(movie) 
        existingUser = await User.findById(user)  
    } catch (err) {
        return console.error(err)
    }

    if(!existingMovie){
        return res.status(404).json({message:"Movie not found"})
    }

    if(!existingUser){
        return res.status(404).json({message:"User not found"})
    }

    let booking

    try {
        const session = await mongoose.startSession()
        session.startTransaction()

        booking = new Bookings({
            movie, 
            date:new Date(`${date}`),
            seatNumber,
            user
        })    
        // if (!existingUser.bookings) {
        //     existingUser.bookings = [];
        // }  
        existingUser.bookings.push(booking)

        // if (!existingMovie.bookings) {
        //     existingMovie.bookings = [];
        // }
        existingMovie.bookings.push(booking)

        await existingUser.save({session})
        await existingMovie.save({session})
        await booking.save({session})
        await session.commitTransaction()
        session.endSession()

    } catch (err) {
        return console.error(err)        
    }

    if(!booking){
        return res.status(500).json({message: "Uanble to create new booking"})
    }

    return res.status(200).json({booking})
}

export const getAllBookings = async(req,res,next) =>{
    let bookings
    try {
        bookings = await Bookings.find()        
    } catch (err) {
        return console.error(err);        
    }

    if(!bookings){
        return res.status(500).json({message: "Could not fetch bookings"})
    }

    return res.status(200).json({bookings})
}

export const getBookingsByID = async (req,res,next)=>{
    const {id}= req.params
    let booking
    try {
        booking = await Bookings.findById(id)
    } catch (err) {
        return console.error(err)       
    }
    if(!booking){
        return res.status(500).json({message: "Internal server error"})
    }
    return res.status(200).json({booking})
}

export const deleteBooking = async (req,res,next)=>{
    const {id} = req.params
    // let booking
    try {
        const booking =  await Bookings.findByIdAndRemove(id).populate("user movie") //poulate method very interesting

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
          }
        const session = await mongoose.startSession()
        session.startTransaction()

        await booking.user.bookings.pull(booking)
        await booking.movie.bookings.pull(booking)

        await booking.user.save({session})
        await booking.movie.save({session})
        await session.commitTransaction()
        session.endSession()

        return res.status(200).json({ message: "Booking deleted successfully" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Unexpected error occurred" })
    }
}