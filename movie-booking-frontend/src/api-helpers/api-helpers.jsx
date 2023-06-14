import axios from 'axios'
import mongoose from 'mongoose'

export const getAllMovies = async () => {
    const res = await axios
        .get("/movies")
        .catch((err) => console.error(err))

    if(res.status !== 200){
        return console.log("No data")
    }

    const data = await res.data
    return data
}

export const sendUserAuthRequest = async (data,signup) =>{
    const res = await axios
        .post(`/users/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "", 
            email: data.email, 
            password: data.password
        })
        .catch((err)=>console.error(err)
    )

    if(res.status !== 200 && res.status !== 201){
        console.log("Unexpected error occurred");
    }

    const resData = await res.data
    return resData
}

export const sendAdminAuthRequest = async (data) =>{
    const res = await 
        axios.post('/admin/login', {
            email:data.email,
            password:data.password
        }).catch((err)=>{console.log(err);}
    )

    if(res.status !== 200){
        return console.log("Unexpected error");
    }

    const resData = await res.data
    return resData
}

export const getMovieDetails = async (id)=>{
    const res = await 
        axios.get(`/movies/${id}`)
            .catch((err) =>console.log(err))

    if(res.status !== 200){
        return console.log("Couldnt fetch movie")
    }

    const resData = await res.data
    return resData
    
}

export const newBooking = async (data) =>{
    const res = await axios.post('/bookings', {
        movie: data.movie,
        seatNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId")
    }).catch((err)=>console.log(err))

    if(res.status !== 200){
        return console.log("Could not book movie")
    }

    const resData = res.data
    return resData

}

export const getUserBooking  = async () =>{
    const id = localStorage.getItem("userId")
    const res = await axios
        .get(`/users/bookings/${id}`)
        .catch((err)=> console.log(err))

    if(res.status !== 200 ){
        return console.log("Could not get bookings of user")
    }

    const resData = await res.data
    return resData
}

export const getOneUserDetails = async () =>{
    const id = localStorage.getItem("userId") // || localStorage.getItem("adminId")
    // const id = new mongoose.Types.ObjectId(userId)
    const res = await axios
        .get(`/users/${id}`)
        .catch((err)=>console.log(err))

    if(res.status !==200){
        return console.log(`Could not find user with id ${id}`)
    }

    const resData = await res.data
    return resData
}

export const deleteBooking = async (id)=>{
    const res = await axios
        .delete(`/bookings/${id}`)
        .catch((err)=>console.log(err))

    if(res.status !==200){
        return console.log("Could  not delete booking")
    }
    
    const resData = res.data
    return resData
}

export const addMovie = async(data) =>{
    const res = await axios
        .post('/movies', {
            title:data.title,
            description:data.description,
            releaseDate:data.releaseDate,
            posterUrl:data.posterUrl,
            featured:data.featured,
            actors:data.actors,
            admin:new mongoose.Types.ObjectId(localStorage.getItem("adminId"))
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }).catch(err=>console.error(err))

        if(res.status !=200){
            return console.log("Could not add movie")
        }

        const resData = await res.data
        return resData
}

export const getAdminById = async()=>{
    const adminId = localStorage.getItem("adminId")

    const res = await axios.get(`/admin/${adminId}`)
    .catch(err=>console.error(err))

    if(res.status !== 200){
        return console.log(`Could not get admin with id ${adminId}`)
    }

    const resData = await res.data
    return resData
}