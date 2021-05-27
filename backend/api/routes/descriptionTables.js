const express = require('express')
const router = express.Router()
const pool = require('./connection')


/**
 * Gets all the dances
 */
router.get('/dances', (req, res, next) => {
    pool.query('SELECT * FROM tab_dances ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})




/**
 * Gets all the disciplines
 */
router.get('/disciplines', (req, res, next) => {
    pool.query('SELECT * FROM tab_disciplines ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

/**
 * Gets all the disciplines
 */
router.get('/judges_disciplines', (req, res, next) => {
    pool.query('SELECT * FROM tab_judges_disciplines ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


/**
 * Gets all the disciplines
 */
router.get('/judges_licenses', (req, res, next) => {
    pool.query('SELECT * FROM tab_judges_licenses ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

/**
 * Gets all the disciplines
 */
router.get('/officials_licenses', (req, res, next) => {
    pool.query('SELECT * FROM tab_officials_licenses ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


/**
 * Gets all the disciplines
 */
router.get('/officials_roles', (req, res, next) => {
    pool.query('SELECT * FROM tab_officials_roles ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

/**
 * Gets all the disciplines
 */
router.get('/sectors_discipline', (req, res, next) => {
    pool.query('SELECT * FROM tab_sectors_discipline ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})



/**
 * Gets all the disciplines
 */
router.get('/unit_type', (req, res, next) => {
    pool.query('SELECT * FROM tab_unit_type ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


/**
 * Gets all the disciplines   sdfsdfsdfsdfsdf
 */
router.get('/age_category', (req, res, next) => {
    pool.query('SELECT * FROM tab_age_category ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

/**
 * Gets all the disciplines   sdfsdfsdfsdfsdf
 */
router.get('/classe', (req, res, next) => {
    pool.query('SELECT * FROM tab_classe ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

/**
 * Gets all the disciplines   sdfsdfsdfsdfsdf
 */
router.get('/competition_type', (req, res, next) => {
    pool.query('SELECT * FROM tab_competition_type ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})



/**
 * Gets all the disciplines   sdfsdfsdfsdfsdf
 */
router.get('/judging_systems', (req, res, next) => {
    pool.query('SELECT * FROM tab_judging_systems ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


/**
 * Gets all the disciplines   sdfsdfsdfsdfsdf
 */
router.get('/rounds', (req, res, next) => {
    pool.query('SELECT * FROM tab_rounds ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})














module.exports = router;