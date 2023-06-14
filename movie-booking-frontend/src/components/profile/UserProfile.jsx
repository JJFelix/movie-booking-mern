import React, {Fragment, useEffect, useState } from 'react'
import { deleteBooking, getMovieDetails, getOneUserDetails, getUserBooking } from '../../api-helpers/api-helpers'
import { Box } from '@mui/system'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const UserProfile = () => {
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState([]);
  // const [moviee, setMoviee] = useState({})

  useEffect(() => {
    getOneUserDetails()
      .then((res)=>setUser(res.user))
      .catch((err)=>console.log(err))
  }, [])

  useEffect(() => {
    getUserBooking()
      .then((res)=> setBookings(res.bookings))
      .catch((err)=>console.log(err))
  }, []);

  // console.log(bookings.movie)

  // useEffect(()=>{
  //   getMovieDetails(bookings[0].movie)
  //     .then((res)=>setMoviee(res.moviee))
  //     .catch((err)=>console.log(err))
  // }, [])

  // console.log(movie)
  

  console.log(bookings)
  // console.log(user.name)

  const handleDelete = (id)=>{
    deleteBooking(id)
      .then((res)=>console.log(res))
      .catch((err)=>console.error(err))
  }

  return (
      <Box width={'100%'} display={'flex'}>
        <Box width={'30%'} padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <AccountCircleIcon sx={{fontSize:"10rem", textAlign:"center", ml:3}} />

          <Typography padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
            Name: { user.name }
            {/* Name: {bookings.user.name} */}
          </Typography>

          <Typography padding={1} mt={2} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
            Email: { user.email }
          </Typography>
        </Box>

        <Box width={'70%'} display={'flex'} flexDirection={'column'}>
          <Typography variant='h3' fontFamily={"verdana"} textAlign={'center'} padding={2}>
            Bookings
          </Typography>

          <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
            <List >
              {bookings.map((booking,index)=>(
                <ListItem key={index} sx={{bgcolor:"#7236EE", color:"white", textAlign:"center", margin:1}}>
                  <ListItemText  sx={{margin:1, width:"auto", textAlign:"left"}}>
                      MovieID: {booking.movie}<br />
                  </ListItemText>
                  <ListItemText  sx={{margin:1, width:"auto", textAlign:"left"}}>
                      Date: {new Date(booking.date).toDateString()}<br />
                  </ListItemText>
                  <ListItemText  sx={{margin:1, width:"auto", textAlign:"left"}}>
                      Seat: {booking.seatNumber}
                  </ListItemText>
                  <IconButton onClick={()=>handleDelete(booking._id)} color='error'>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
              
          {/* <Typography textAlign={'center'}>
            Seat Number: {bookings[0].seatNumber}
          </Typography> */}
        </Box>
      </Box>
  )
}

export default UserProfile