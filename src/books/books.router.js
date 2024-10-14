import express from "express"
import { BooksController } from "./books.controller.js"

const router = express.Router()
const booksController = new BooksController()

export default router