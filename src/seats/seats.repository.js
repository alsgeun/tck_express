import { prisma } from '../../prisma/index.js'

export class SeatsRepository {
    updateSeat = async(scheduleId, seat, showId) => {
        const updatedSeat = await prisma.seats.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                availableSeat : +seat
            }
        })
        await prisma.schedules.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                showId : +showId,
            }
        })
        return updatedSeat
    }

    restore = async(seatEa, scheduleId) => {
        const updatedSeat = await prisma.seats.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                availableSeat : seatEa
            }
        })
        return updatedSeat
    }
}