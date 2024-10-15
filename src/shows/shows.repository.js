import { prisma } from '../../prisma/index.js'

export class ShowsRepository {

    findShow = async(showName) => {
        const show = await prisma.shows.findUnique({ where : { showName } })
        return show
    }

    findAllShows = async() => {
        const allShows = await prisma.shows.findMany({
            select : {
                showName : true,
                venue : true,
                price : true,
                performer : true,
                schedules : {
                    select : {
                        date : true,
                        time : true 
                    }
                }
            }
        })
        return allShows
    }

    findShows = async(searchWord) => {
        const shows = await prisma.shows.findMany ({
            where : {
                showName : {
                    contains : `${searchWord}`
                }
            },
            select : {
                showName : true,
                venue : true,
                price : true,
                performer : true,
                schedules : {
                    select : {
                        date : true,
                        time : true 
                    }
                }
            }
        })
        return shows
    }

    findDetailShowWithId = async(showId) => {
        const show = await prisma.shows.findUnique({
            where : {
                showId : +showId
            },
            select : {
                showId : true,
                showName : true,
                description : true,
                category : true,
                venue : true,
                price : true,
                performer : true,
                image : true,
                schedules : {
                    select : {
                        date : true,
                        time : true,
                        booksStatus : true,
                        seats : {
                            select : {
                                availableSeat : true,
                                totalSeat : true
                            }
                        }
                    }
                }
            }
        })
        return show
    }

    register = async(userId, showName, description, category, venue, price, performer, image, date, time, dateTime, totalSeat) => {
        const existingShow = await prisma.shows.findUnique({
            where: {
                userId_showName: {
                    userId: +userId,
                    showName: showName,
                },
            },
        })

        let showInfo;

        if (existingShow) {
            showInfo = await prisma.shows.update({
                where: {
                    userId_showName: {
                        userId: +userId,
                        showName: showName,
                    },
                },
                data: {
                    description,
                    category,
                    venue,
                    price: +price,
                    performer,
                    image,
                },
            })
        } else {
            showInfo = await prisma.shows.create({
                data: {
                    userId: +userId,
                    showName,
                    description,
                    category,
                    venue,
                    price: +price,
                    performer,
                    image,
                },
            })
        }

        const showSchedules = await prisma.schedules.create({
            data: {
                showId: showInfo.showId,
                date,
                time,
                dateTime,
                booksStatus: 'possible',
            },
        })

        const showTotalSeats = await prisma.seats.create({
            data: {
                scheduleId: showSchedules.scheduleId,
                availableSeat: +totalSeat,
                totalSeat: +totalSeat,
            },
        })

        return { showInfo, showSchedules, showTotalSeats };
    }
    updateShowStatus = async() => {
        const nowDateTime = new Date()
        const updatedBooksStatus = await prisma.schedules.updateMany({
            where : {
                dateTime : {
                    lt : nowDateTime
                }
            },
            data : {
                booksStatus : 'impossible'
            }
        })

        if (updatedBooksStatus.schedules.booksStatus === 'impossible') {
            await prisma.shows.update({
                where : {
                    showId : updatedBooksStatus.showId
                },
                data : {
                    category : 'past'
                }
            })
        }
    }
}