import { prisma } from '../../prisma/index.js'

export class SeatsRepository {
    updateSeat = async(scheduleId, seat, showId) => {
        const updatedSeat = await prisma.seats.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                scheduleId : +scheduleId,
                availableSeat : +seat
            }
        })
        const updatedShow = await prisma.schedules.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                showId : +showId,
                scheduleId : +scheduleId
            }
        })
        return { updatedSeat, updatedShow }
    }
}