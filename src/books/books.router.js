import express from "express"
import { BooksController } from "./books.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()
const booksController = new BooksController()

router.get('/list', authMiddleware, booksController.getList)

export default router