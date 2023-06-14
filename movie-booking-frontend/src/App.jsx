import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Admin from "./components/auth/Admin"
import Homepage from "./components/homepage/Homepage"
import Movies from "./components/movies/Movies"
import Auth from "./components/auth/Auth"
import UserProfile from './components/profile/UserProfile'
import Booking from './components/bookings/Booking'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { adminActions, userActions } from './store'
import AddMovie from './components/movies/AddMovie'
import AdminProfile from './components/profile/AdminProfile'

// import viteLogo from '/vite.svg'
function App() {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  console.log("Is admin Logged in:", isAdminLoggedIn)
  console.log("Is user Logged in:", isUserLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }
  },[])
  return (
      <div>
        {/*Header */}
        <Navbar />
        <section>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/movies' element={<Movies />} />

            {!isUserLoggedIn && !isAdminLoggedIn &&
              <>
                <Route path='/admin' element={<Admin />} />
                <Route path='/auth' element={<Auth />} />
              </>
            }

            {isUserLoggedIn && !isAdminLoggedIn &&
              <>
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/booking/:id' element={<Booking />}/>              
              </>              
            }

            {isAdminLoggedIn && !isUserLoggedIn &&
              <>
                <Route path='/add' element={<AddMovie />}/>
                <Route path='/adminProfile' element={<AdminProfile />} /> 
              </>
            }
          </Routes>
        </section>
        {/*Homepage */}
      </div>
  )
}

export default App

