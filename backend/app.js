import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user-routes'
import adminRoute from './routes/admin-routes'
import movieRoute from './routes/movie-routes'
import bookingRoute from './routes/booking-routes'
import cors from 'cors'

dotenv.config()

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use('/users',userRoute)
app.use('/admin', adminRoute)
app.use('/movies', movieRoute)
app.use('/bookings', bookingRoute)

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.e6ppxo0.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=> 
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to database. Server listening on  http://localhost:${process.env.PORT}`)
         })
    ).catch((err)=> console.log(err)
)
