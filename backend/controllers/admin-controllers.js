import Admin from "../models/Admin"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const addAdmin  = async(req, res, next)=>{
    const {email, password} = req.body
    let existingAdmin

    try {
        existingAdmin = await Admin.findOne({email:email})
    } catch (err) {
        return console.log(err)        
    }

    if(existingAdmin){
        return res.status(400).json({message: "Admin already exists"})
    }

    let admin
    const hashedPassword = bcrypt.hashSync(password,10)

    try {
        admin = new Admin({email, password:hashedPassword})
        admin = await admin.save()
    } catch (err) {
        return console.log(err)        
    }

    if(!admin){
        return res.status(500).json({message: "Unable to store admin"})
    }

    return res.status(201).json({admin})
}

export const loginAdmin  =async (req,res, next)=>{
    const {email, password} = req.body

    if (!email || email.trim() === "" || !password || password.trim() === ""){
        return res.status(422).json({message: "Invalid Input"})
    }

    let existingAdmin
    try {
        existingAdmin = await Admin.findOne({email})
    } catch (err) {
        return console.log(err)        
    }

    if(!existingAdmin){
        return res.status(400).json({message: "Admin not found"})
    }

    const isPasswordCorrect  =bcrypt.compareSync(password, existingAdmin.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }

    const token = jwt.sign({id:existingAdmin._id}, process.env.SECRET_KEY, {
        expiresIn:"1d",
    })

    return res
    .status(200)
    .json({message: "Aunthentication complete", token, id:existingAdmin._id})
}

export const getAdmins = async (req,res,next)=>{
    let admins
    try {
        admins = await Admin.find()
    } catch (err) {
        return console.log(err)
    }

    if(!admins){
        return res.status(500).json({message:"Internal server error"})
    }

    return res.status(200).json({admins})
}

export const getAdminById = async (req,res,next)=>{
    const {id} = req.params
    let admin
    try {
        admin = await Admin.findById(id)
    } catch (err) {
        return console.log(err)
    }

    if(!admin){
        return res.status(500).json({message:`Admin with id ${id} not found`})
    }

    return res.status(200).json({admin})
}