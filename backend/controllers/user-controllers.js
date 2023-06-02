import Bookings from "../models/Bookings"
import User from "../models/User"
import bcrypt from 'bcrypt'

export const getAllUsers = async(req,res,next)=>{
    let users
    try {
        users = await User.find()
    } catch (err) {
        return console.log(err)
    }

    if(!users){
        return res.status(500).json({message: "Unexpected error occurres"})
    }

    return res.status(200).json({ users })
}

export const addUser = async (req,res, next)=>{
    const {name, email, password} = req.body

    if (
        !name || name.trim()==="" ||
        !email || email.trim()=== "" ||
        !password || password.trim()===""
        ){
            return res.status(422).json({message: "Invalid inputs"})
        }
    const hashedPassword = bcrypt.hashSync(password, 10)
    let user
    try {
        user = new User({ name, email, password:hashedPassword})   
        user = await user.save()     
    } catch (err) {
        return console.log(err)
    }

    if(!user){
        return res.status(500).json({message:"Unexpected error occurred"})
    }

    return res.status(201).json({user})
}

export const updateUser = async (req,res,next)=>{
    const {id} = req.params
    const {name, email, password} = req.body

    if (
        !name || name.trim()==="" ||
        !email || email.trim()=== "" ||
        !password || password.trim()===""
        ){
            return res.status(422).json({message: "Invalid inputs"})
        }

    const hashedPassword = bcrypt.hashSync(password, 10)
    let user
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword})        

    } catch (err) {
        return console.log(err)        
    }

    if(!user){
        return res.status(500).json({message: "Something went wrong"})
    }

    return res.status(200).json({message:"Updated successfully"})
}

export const deleteUser = async (req,res,next)=>{
    const {id} = req.params
    let user
    try {
        user = await User.findByIdAndRemove(id)        
    } catch (err) {
        return console.log(err)        
    }

    if (!user){
        return res.status(500).json({message: "Something went wrong"})
    }

    return res.status(200).json({message: `User with id ${id} deleted successfully`})
}

export const login = async (req,res,next)=>{
    const {email, password} = req.body

    if (!email || email.trim()=== "" || !password || password.trim()===""){
            return res.status(422).json({message: "Invalid inputs"})
    }

    let existingUser
    try {
        existingUser = await User.findOne({ email })                
    } catch (err) {
        return console.log(err)        
    }

    if(!existingUser){
        return res.status(404).json({message: `Unable to find user with email ${email}`})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successful"})
}

export const getBookingsOfUser  =async (req,res,next)=>{
    const {id} = req.params
    let bookings

    try {
        bookings = await Bookings.find({user:id})
    } catch (err) {
        return console.error(err)
    }

    if(!bookings){
        return res.status(404).json({message: "Bookings not found"})
    }

    return res.status(200).json({bookings})
}