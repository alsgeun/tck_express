import { prisma } from '../../prisma/index.js'

export class BooksRepository {
    records = async(scheduleId, userId) => {
        await prisma.books.create({
            data : {
                scheduleId : +scheduleId,
                userId : +userId
            }
        })
    }
}