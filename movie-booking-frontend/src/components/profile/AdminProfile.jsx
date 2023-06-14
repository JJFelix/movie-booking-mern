import React, {Fragment, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import {getAdminById} from '../../api-helpers/api-helpers'

const AdminProfile = () => {
  const [admin, setAdmin] = useState({})
  const [movies, setMovies] = useState([])

    useEffect(()=>{
        getAdminById()
            .then((res)=>{
                setAdmin(res.admin)
                res.admin.addedMovies.forEach((element)=>{
                    setMovies((movies)=>[...movies, element])
                })
                const updatedMovies = res.admin.addedMovies.map((element)=>element)
                setMovies(updatedMovies)
            })
            .catch((err)=>console.error(err))
    },[])

  console.log(movies)

  return (
      <Box width={'100%'} display={'flex'}>
        <Box width={'30%'} padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <AccountCircleIcon sx={{fontSize:"10rem", textAlign:"center", ml:3}} />

          <Typography padding={1} mt={2} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
            Email: { admin.email }
          </Typography>
        </Box>

        <Box width={'70%'} display={'flex'} flexDirection={'column'}>
            <Typography variant='h3' fontFamily={"verdana"} textAlign={'center'} padding={2}>
                Added Movies
            </Typography>

            <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
                <List >
                    {movies.slice(0,(movies.length)).map((movie,index)=>(
                        <ListItem key={index} sx={{bgcolor:"#7236EE", color:"white", textAlign:"center", margin:1}}>
                            <ListItemText  sx={{margin:1, width:"auto", textAlign:"left"}}>
                                MovieID: {movie}<br />
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>

      </Box>
  )
}

export default AdminProfile