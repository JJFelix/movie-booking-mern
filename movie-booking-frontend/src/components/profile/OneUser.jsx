import React, { useEffect, useState } from 'react'
import { getOneUserDetails, getUserBooking } from '../../api-helpers/api-helpers'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const OneUser = () => {
    const [user, setUser] = useState([])
    const [bookings, setBookings] = useState()

    useEffect(()=>{
        getOneUserDetails()
            .then((res)=>setUser(res.user))
            .catch((err)=>console.log(err))
    },[])
    // console.log(user)

    useEffect(() => {
        getUserBooking()
        .then((res)=> setBookings(res.bookings))
        .catch((err)=>console.log(err)) 
    }, [])
    console.log(bookings)


  return (
    <Box>
        <Typography>
            {user.name}
        </Typography>
        <Typography>
            {user.email}
        </Typography>
    </Box>
  )
}

export default OneUser