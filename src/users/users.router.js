import express from "express"
import { UsersController } from "./users.controller"

const router = express.Router()
const usersController = new UsersController()

router.post('/sign-up', usersController)

export default router