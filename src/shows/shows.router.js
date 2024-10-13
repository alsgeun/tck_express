import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { ShowsController } from "./shows.controller.js"

const router = express.Router()
const showsController = new ShowsController()

router.post('/', authMiddleware, showsController.register)
router.post('/search', showsController.search)
router.post('/:showId', showsController.detailShow)
export default router