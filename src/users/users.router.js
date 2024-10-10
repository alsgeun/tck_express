import express from "express"
import { UsersController } from "./users.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()
const usersController = new UsersController()

router.post('/sign-up', usersController.signUp)
router.post('/sign-in', usersController.signIn)
router.get('/profile', authMiddleware, usersController.profile)

export default router