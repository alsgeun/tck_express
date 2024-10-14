import { prisma } from '../../prisma/index.js'

export class SeatsRepository {
    updateSeat = async(scheduleId, seat) => {
        const updatedSeat = await prisma.seats.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                scheduleId : +scheduleId,
                availableSeat : +seat
            }
        })
        return updatedSeat
    }
}