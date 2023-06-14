import { useDispatch } from "react-redux"
import { sendUserAuthRequest } from "../../api-helpers/api-helpers"
import AuthForm from "./AuthForm"
import { userActions } from "../../store"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onResreceived = (data)=>{
    console.log("data from onreceived: ",data)
    dispatch(userActions.login())
    localStorage.setItem("userId", data.id)
    navigate('/')
  }

  const getData = (data) =>{
    console.log("Data from getData: ", data)
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResreceived)
      .catch((err)=>console.log(err))
  }
  
  return (
    <AuthForm 
      onSubmit={getData} 
      isAdmin={false}
    />
  )
}

export default Auth