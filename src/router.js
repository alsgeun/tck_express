import express from "express"
import UsersRouter from "./users/users.router.js"
import ShowsRouter from "./shows/shows.router.js"
import BooksRouter from "./books/books.router.js"

const router = express.Router()

router.use('/users', UsersRouter)
router.use('/shows', ShowsRouter)
router.use('/books', BooksRouter)
export default router