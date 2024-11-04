import { prisma } from '../../prisma/index.js'

export class BooksRepository {
    records = async(scheduleId, userId, showId, seatEa) => {
        for (let i = 0; i < seatEa; i++) {
           await prisma.books.create({
            data : {
                scheduleId : +scheduleId,
                userId : +userId,
                showId : +showId,
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

    bookDetail = async(bookId, userId) => {
        const bookDetail = await prisma.books.findUnique({
            where : {
                bookId : +bookId,
                userId : +userId
            },
            select : {
                bookId : true,
                userId : true,
                scheduleId : true,
                showId : true,
                schedule : {
                    select : {
                        date : true,
                        time : true,
                        seats : {
                            select : {
                                availableSeat : true
                            }
                        }
                    }
                }
            }
        })
        return bookDetail
    }

    showDetail = async(showId) => {
        const showDetail = await prisma.shows.findUnique({
            where : {
                showId : +showId
            }
        })
        return showDetail
    }

    cancel = async(bookId, userId) => {
        await prisma.books.delete({
            where : {
                bookId : +bookId,
                userId : +userId
            }
        })
    }

    findBookedUsers = async(showId, scheduleId, userId) => {
        const bookedUsers = await prisma.books.findMany({
            where : {
                showId : +showId,
                scheduleId : +scheduleId,
                userId : +userId
            }
        })
        return bookedUsers
    }

    deleteBooks = async(bookId) => {
        await prisma.books.delete({
            where : {
                bookId
            }
        })
    }

    deleteByScheduleId = async(scheduleId) => {
        await prisma.books.deleteMany({
            where : {
                scheduleId : +scheduleId
            }
        })
    }
}