import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Box } from '@mui/system'
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions} from '../store'

const Navbar = () => {
  const dispath = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const [value, setValue] = useState(0)
  const [movies, setMovies] = useState([])

  useEffect(()=> {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch(err=>console.log(err))
  }, [])

  const logout = (isAdmin)=>{
    dispath(isAdmin ? adminActions.logout() : userActions.logout())
    
  }

  return (
    <AppBar position='sticky' sx={{bgcolor:"#006AD4"}}>
      <Toolbar>

        <Box width={'20%'}>
          <MovieIcon />
        </Box>

        <Box width={'30%'} borderColor={'black'} margin={'auto'}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => 
              <TextField 
                sx={{ input: {color:"white"} }}
                variant='standard'
                {...params} 
                placeholder="Search all movies" 
              />}
          />
        </Box>

        <Box display={'flex'}>
          <Tabs textColor='inherit' indicatorColor={'secondary'} value={value} onChange={(e,val)=>setValue(val)}>
            {[
              <Tab key="movies" LinkComponent={Link} to="/movies" label="Movies" />,
              // <Tab key="home" LinkComponent={Link} to="/" label="Home" />
            ]}

            {!isAdminLoggedIn && !isUserLoggedIn && [
              <Tab key="admin" LinkComponent={Link} to="/admin" label="Admin"/>,
              <Tab key="auth" LinkComponent={Link} to="/auth" label="Auth"/>   
            ]}

            {isUserLoggedIn && [
              <Tab key="profile" label="Profile" LinkComponent={Link} to="/user"></Tab>,
              <Tab onClick={()=>logout(false)} key="logout" label="Logout" LinkComponent={Link} to="/"></Tab>              
            ]}

            {isAdminLoggedIn && [
              <Tab key="profile" label="Add Movie" LinkComponent={Link} to="/add"></Tab>,
              <Tab key="addmovie" label="Profile" LinkComponent={Link} to="/admin"></Tab>,
              <Tab onClick={()=> logout(true)}  key="logout" label="Logout" LinkComponent={Link} to="/"></Tab>              
             ]}
          </Tabs>
        </Box>

      </Toolbar>
    </AppBar>
  )
}
export default Navbar