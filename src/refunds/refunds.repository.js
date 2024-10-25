import { prisma } from '../../prisma/index.js'

export class RefundsRepository {
    refundRecords = async(userId, points, date, time,  seatEa) => {
        for (let i = 0; i < seatEa; i++) {
            const aaa = await prisma.refunds.create({
                data : {
                    userId : +userId,
                    date,
                    time,
                    refundPoints : +points
                }
            })
            return aaa
        }
    }

    records = async(userId) => {
        const refundRecords = await prisma.refunds.findMany({
            where : {
                userId : +userId
            }
        })
        return refundRecords
    }
}