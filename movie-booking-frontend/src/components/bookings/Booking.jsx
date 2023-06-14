import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers'
import { Button, FormLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

const Booking = () => {
    const [movie, setMovie] = useState()
    const [inputs, setInputs] = useState({seatNumber: "", date: " "})
    const id = useParams().id
    // console.log(id);
    useEffect(()=>{
        getMovieDetails(id)     
            .then((res)=>setMovie(res.movie))   
            .catch((err)=>console.log(err))
    },[id])
    // console.log(movie)
    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        // console.log(inputs)
        newBooking({
            ...inputs, 
            movie: movie._id
        })
            .then((res)=>console.log(res))
            .catch((err)=>console.error(err))
    }
    
  return (
    <div>
        {movie && 
            <Fragment>
                <Typography padding={3} fontFamily={"Roboto"} variant="h4"textAlign={"center"}>
                    Book tickets for <strong>{movie.title}</strong>
                </Typography>

                <Box display={'flex'} justifyContent={"center"}>
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} padding={1} width={'50%'} marginRight={'auto'} >
                        <img width={'80%'} height={'300px'} src={movie.posterUrl} alt={movie.title} />
                        <Box width={'80%'}  marginTop={1} padding={1} >
                            <Typography paddingTop={1} fontFamily={'fantasy'} fontSize={'small'} > {movie.description} </Typography>
                            <Typography fontWeight={'bold'} marginTop={1}> 
                               {"Cast: "+ movie.actors.map((actor)=> " " + actor)}  
                            </Typography>
                            <Typography fontWeight={'bold'} marginTop={1}>
                                Release date: {new Date(movie.releaseDate).toDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    <Box width={'50%'} paddingTop={1} >
                        <form onSubmit={handleSubmit}>
                            <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
                                <FormLabel >Seat Number</FormLabel>
                                <TextField value={inputs.seatNumber} onChange={handleChange} name='seatNumber' type={'number'} margin='normal' variant='standard'></TextField>
                                <FormLabel>Date</FormLabel>
                                <TextField value={inputs.date} onChange={handleChange} name='date' type={'date'} margin='normal' variant='standard'></TextField>
                                <Button type='submit' sx={{mt:3}}>Book Now</Button>
                            </Box>
                        </form>
                    </Box>

                </Box>
            </Fragment>}
    </div>
  )
}

export default Booking