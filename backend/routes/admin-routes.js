import express from "express";
import { addAdmin, getAdmins, loginAdmin } from "../controllers/admin-controllers";

const adminRoute  = express.Router()

adminRoute.post('/signup', addAdmin )
adminRoute.post('/login', loginAdmin)
adminRoute.get('/', getAdmins)

export default adminRoute