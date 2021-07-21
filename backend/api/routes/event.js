const express = require("express");
const router = express.Router();
const pool = require("./connection");

/**
 * Gets all the events
 */
router.get("/getEvent", (req, res, next) => {
    console.log(req.query.user);
    pool.query(
        'SELECT * FROM events WHERE "user"= $1', [req.query.user],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

router.post("/addEvent", (req, res, next) => {
    const event = req.body;

    pool.query(
        'SELECT 1 FROM events WHERE name = $1 AND "user" = $2', [event.name, event.user],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    code: 500,
                    message: "Generic network error!",
                });
            }

            if (results.rowCount > 0) {
                return res.status(409).json({
                    code: 409,
                    message: "This event already exists!",
                });
            }

            pool.query(
                "INSERT INTO events (name, begin_date, end_date, begin_date_registration, end_date_registration," +
                'place, organizer_name, organizer_mail, organizer_phone, responsable_name, responsable_mail, responsable_phone, "user") ' +
                "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13)", [
                    event.name,
                    event.beginDate,
                    event.endDate,
                    event.beginDateRegistration,
                    event.endDateRegistration,
                    event.place,
                    event.organizerName,
                    event.organizerMail,
                    event.organizerPhone,
                    event.responsableName,
                    event.responsableMail,
                    event.responsablePhone,
                    event.user,
                ],
                (error, results) => {
                    //  console.log(results);
                    if (error) {
                        console.log(error);
                        let errorNumber = 500;
                        if (error.routine === "_bt_check_unique") errorNumber = 409;

                        return res.status(errorNumber).json({
                            code: errorNumber,
                            message: errorNumber === 409 ?
                                "Event " + event.name + " already exsists" :
                                "Generic network error!",
                        });
                    }
                    // qui ritorna che tutto è andato ok
                    return res.status(201).json({
                        message: "Event created",
                        result: results.rowCount,
                    });
                }
            );
        }
    );
});

/**
 * Gets all the events
 */
router.delete("/deleteEvent", (req, res, next) => {
    console.log(req.body);
    const event = req.body;

    pool.query(
        'DELETE FROM competitions WHERE "user"= $1 AND event = $2 ', [event.user, event.idEvent],
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;

                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "Event " + event.name + " doesn't exsists" :
                        "Can't delete this event because it's used!",
                });
            }

            pool.query(
                'DELETE FROM events WHERE name = $1 AND "user"= $2  AND id= $3', [event.name, event.user, event.idEvent],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        let errorNumber = 500;
                        if (error.routine === "_bt_check_unique") errorNumber = 409;

                        return res.status(errorNumber).json({
                            code: errorNumber,
                            message: errorNumber === 409 ?
                                "Event " + event.name + " doesn't exsists" :
                                "Can't delete this event because it's used!",
                        });
                    }
                    res.status(200).json(results.rows);
                }
            );
        }
    );
});

module.exports = router;