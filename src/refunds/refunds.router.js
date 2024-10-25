import express from "express"
import { RefundsController } from "./refunds.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()
const refundsController = new RefundsController()

router.get('/', authMiddleware, refundsController.records)

export default router
