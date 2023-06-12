import axios from 'axios'

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