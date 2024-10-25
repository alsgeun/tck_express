import { RefundsRepository } from "./refunds.repository.js"

export class RefundsService {
    refundsRepository = new RefundsRepository()

    records = async(userId) => {
        const refundRecords = await this.refundsRepository.records(userId)

        return refundRecords
    }
}