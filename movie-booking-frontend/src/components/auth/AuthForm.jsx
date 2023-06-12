import { Button, Dialog, FormLabel, IconButton, TextField, Typography} from '@mui/material'
import { Box } from '@mui/system'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

const labelStyle = {mt:1, mb:1}

const AuthForm = ({onSubmit, isAdmin}) => {
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })
    const [isSignUp, setIsSignUp] = useState(false)

    const handleChange = (e) =>{
        setInputs((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        onSubmit({inputs, signup: isAdmin ? false : isSignUp})
    }

  return (
    <Dialog PaperProps={{style: {borderRadius:20}}} open={true}>
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton>
                <CloseRoundedIcon />
            </IconButton>            
        </Box>

        <Typography variant='h4' textAlign={'center'}>
            {isSignUp ? "Signup" : "Login"}
        </Typography>
        
        <form onSubmit={handleSubmit}>
            <Box 
                display={'flex'}
                padding={6}
                justifyContent={'center'}
                flexDirection={'column'}
                width={400}
                margin={'auto'}
                alignContent={"center"}
            >
                { !isAdmin && isSignUp && 
                    <>
                    <FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField value={inputs.name} onChange={handleChange} margin='normal' variant='standard' type={'text'} name='name'></TextField>                
                    </>                    
                 }
                <FormLabel sx={labelStyle}>Email</FormLabel>
                <TextField value={inputs.email} onChange={handleChange} margin='normal' variant='standard' type={'email'} name='email'></TextField>
                <FormLabel sx={labelStyle}>Password</FormLabel>
                <TextField value={inputs.password} onChange={handleChange} margin='normal' variant='standard' type={'password'} name='password'></TextField> 
                <Button 
                    sx={{mt:1,bgcolor:"#006AD4",color:"white", borderRadius:10,
                    ":hover":{                                                
                        color:"#006AD4",
                        bgcolor:"#7AB5F1"
                        },
                    }}
                        type='submit' 
                        fullWidth
                        variant={'contained'}
                    >{isSignUp ? "Signup" : "Login"}
                </Button>

                { !isAdmin && 
                    <>
                        <Button 
                            sx={{mt:1,bgcolor:"#006AD4",color:"white", borderRadius:10,
                            ":hover":{                                                
                                color:"#006AD4",
                                bgcolor:"#7AB5F1"
                            },
                            }}
                                type='button' 
                                fullWidth
                                onClick={()=> setIsSignUp(!isSignUp)}
                                // variant={'contained'}
                            >Switch to {isSignUp ? "Login" : "SignUp"}
                        </Button>
                    </>
}
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm