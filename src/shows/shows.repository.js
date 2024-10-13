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

    register = async(showName, description, category, venue, price, performer, image, date, time, totalSeat) => {
        const showInfo = await prisma.shows.create({
            data : {
                showName,
                description,
                category,
                venue,
                price : +price,
                performer,
                image
            }
        })
        const showSchedules = await prisma.schedules.create({
            data : {
                showId : showInfo.showId,
                date,
                time
            }
        })
        const showTotalSeats = await prisma.seats.create({
            data : {
                scheduleId : showSchedules.scheduleId,
                availableSeat : +totalSeat,
                totalSeat : +totalSeat
            }
        })
        return { showInfo, showSchedules, showTotalSeats }
    }

    
}