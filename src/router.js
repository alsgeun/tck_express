import express from "express"
import UsersRouter from "./users/users.router.js"
import ShowsRouter from "./shows/shows.router.js"
import BooksRouter from "./books/books.router.js"
import RefundsRouter from "./refunds/refunds.router.js"

const router = express.Router()

router.use('/users', UsersRouter)
router.use('/shows', ShowsRouter)
router.use('/books', BooksRouter)
router.use('/refunds', RefundsRouter)

export default router