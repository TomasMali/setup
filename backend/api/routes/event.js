const express = require('express')
const router = express.Router()
const pool = require('./connection')


/**
 * Gets all the events
 */
router.get('/getEvent', (req, res, next) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})






router.post("/addEvent", (req, res, next) => {
    const event = req.body

    pool.query('INSERT INTO events (name, date) VALUES ($1, $2)', [event.name, event.date], (error, results) => {

        console.log(results)
        if (error) {
            console.log(error)
            let errorNumber = 500
            if (error.routine === '_bt_check_unique')
                errorNumber = 409

            return res.status(errorNumber).json({
                code: errorNumber,
                message: errorNumber === 409 ? "Event " + event.name + " already exsists" : "Generic network error!"
            })

        }
        // qui ritorna che tutto è andato ok 
        return res.status(201).json({
            message: "Event created",
            result: results.rowCount
        })

    })
})


/**
 * Gets all the events
 */
router.delete('/deleteEvent', (req, res, next) => {
    console.log(req.body)
    const event = req.body
    pool.query('DELETE FROM events WHERE name = $1', [event.name], (error, results) => {
        if (error) {
            console.log(error)
            let errorNumber = 500
            if (error.routine === '_bt_check_unique')
                errorNumber = 409

            return res.status(errorNumber).json({
                code: errorNumber,
                message: errorNumber === 409 ? "Event " + event.name + " doesn't exsists" : "Can't delete this event because it's used!"
            })
        }
        res.status(200).json(results.rows)
    })
})



module.exports = router;