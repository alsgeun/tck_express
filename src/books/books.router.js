import express from "express"
import { BooksController } from "./books.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()
const booksController = new BooksController()

router.get('/list', authMiddleware, booksController.getList)
router.get('/:bookId/detail', authMiddleware, booksController.detail)
router.delete('/:bookId/cancel', authMiddleware, booksController.cancel)

export default router