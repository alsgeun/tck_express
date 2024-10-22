import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { ShowsController } from "./shows.controller.js"
import { upload } from "../middlewares/upload.middleware.js"

const router = express.Router()
const showsController = new ShowsController()

router.post('/', authMiddleware, upload, showsController.register)
router.post('/search', showsController.search)
router.post('/:showId', showsController.detailShow)
router.post('/:showId/standingBooks', authMiddleware, showsController.standing)

export default router