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

module.exports = router;