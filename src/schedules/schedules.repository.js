import { prisma } from '../../prisma/index.js'

export class SchedulesRepository {
    findSchedules = async(scheduleId) => {
        const schedules = await prisma.schedules.findUnique({
            where : {
                scheduleId : +scheduleId
            },
            include: {
                show : true,
                seats : true
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
}