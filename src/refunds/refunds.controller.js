import { RefundsService } from "./refunds.service.js"

export class RefundsController {
    refundsService = new RefundsService()

    records = async(req, res) => {
        try {
            const { userId } = req.user

            const refundRecords = await this.refundsService.records(userId)

            return res.status(200).json({ data : refundRecords })
        } catch (error) {
            return res.status(400).json({ message : error.message })
        }
    }
}