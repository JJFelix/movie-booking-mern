// import React from 'react'
import { useDispatch } from 'react-redux'
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers'
import AuthForm from '../auth/AuthForm'
import { adminActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onResreceived = (data)=>{
    console.log(data);
    dispatch(adminActions.login())
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
    console.log("Data id: ",data.id)
    navigate('/')
  }
  const getData = (data)=>{
    sendAdminAuthRequest(data.inputs)
      .then(onResreceived)
      .catch((err)=>console.log(err))
  }
  return (
    <div>
      <AuthForm 
        onSubmit={getData} 
        isAdmin={true}
      />
    </div>
  )
}

export default Admin