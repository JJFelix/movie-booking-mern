import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Admin from "./components/admin/Admin"
import Homepage from "./components/homepage/Homepage"
import Movies from "./components/movies/Movies"
import Auth from "./components/auth/Auth"
import Booking from './components/bookings/Booking'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { adminActions, userActions } from './store'

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
            <Route path='/admin' element={<Admin />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/booking/:id' element={<Booking />}></Route>
          </Routes>
        </section>
        {/*Homepage */}
      </div>
  )
}

export default App

