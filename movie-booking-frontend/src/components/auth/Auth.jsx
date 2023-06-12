import { useDispatch } from "react-redux"
import { sendUserAuthRequest } from "../../api-helpers/api-helpers"
import AuthForm from "./AuthForm"
import { userActions } from "../../store"

const Auth = () => {
  const dispatch = useDispatch()
  const onResreceived = (data)=>{
    console.log("data from onreceived: ",data)
    dispatch(userActions.login())
    localStorage.setItem("userId", data.id)
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