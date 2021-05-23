const express = require('express')
const router = express.Router()
const pool = require('./connection')






router.post("/addRelation", (req, res, next) => {
    const event = req.body

    pool.query('INSERT INTO relations (id,license, discipline_id, discipline_description,age_group,class,unit_type_id,unit_type,judging_system_preliminary,judging_system_final,calculation_type,first_age_min,first_age_max,second_age_min,second_age_max,alternative_age_group,perc_fq_age,perc_fq_class,members_min,members_max,exclusive_gender,music_required,alias,dances) VALUES($1, $2)', [event.name, event.date], (error, results) => {

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