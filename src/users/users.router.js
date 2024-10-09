import express from "express"
import { UsersController } from "./users.controller.js"

const router = express.Router()
const usersController = new UsersController()

router.post('/sign-up', usersController.signUp)

export default router