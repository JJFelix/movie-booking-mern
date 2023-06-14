import express from "express";
import { addAdmin, getAdminById, getAdmins, loginAdmin } from "../controllers/admin-controllers";

const adminRoute  = express.Router()

adminRoute.post('/signup', addAdmin )
adminRoute.post('/login', loginAdmin)
adminRoute.get('/', getAdmins)
adminRoute.get('/:id', getAdminById)

export default adminRoute