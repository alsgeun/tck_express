import { prisma } from '../../prisma/index.js'

export class SchedulesRepository {
    findSchedules = async(scheduleId) => {
        const schedules = await prisma.schedules.findUnique({
            where : {
                scheduleId : +scheduleId
            },
            select : {
                scheduleId : true,
                showId : true,
                date : true,
                time : true,
                booksStatus : true,
                show : {
                    select : {
                        price : true,
                        category : true,
                    }
                },
                seats : {
                    select : {
                        availableSeat : true
                    }
                }
            }
        })
        return schedules
    }

    changeStatus = async(scheduleId) => {
        await prisma.schedules.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                booksStatus : 'impossible'
            }
        })
    }

    restoreStatus = async(scheduleId) => {
        await prisma.schedules.update({
            where : {
                scheduleId : +scheduleId
            },
            data : {
                booksStatus : 'possible'
            }
        })
    }
}