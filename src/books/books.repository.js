import { prisma } from '../../prisma/index.js'

export class BooksRepository {
    records = async(scheduleId, userId, showId, seatEa) => {
        for (let i = 0; i < seatEa; i++) {
           await prisma.books.create({
            data : {
                scheduleId : +scheduleId,
                userId : +userId,
                showId : +showId
            }
        }) 
        }
    }

    getList = async(userId) => {
        const booksInfo = await prisma.books.findMany({
            where : {
                userId : +userId
            },
            select : {
                bookId : true,
                scheduleId : true,
                userId : true,
                showId : true,
                schedule : {
                    select : {
                        date : true,
                        time : true
                    }
                },
            }
        })

        const showIds = booksInfo.map(book => book.showId)

        const shows = await prisma.shows.findMany({
            where : {
                showId : { in : showIds}
            },
            select : {
                showName : true,
                venue : true,
                performer : true
            }
        })
        return { booksInfo, shows }
    }
}