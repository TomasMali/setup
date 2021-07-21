const express = require("express");
const router = express.Router();
const pool = require("./connection");
var fs = require("fs");

/**
 * get all the FIDS loaded relations
 */
router.get("/getRelationsFIDS", (req, res, next) => {
    pool.query(
        "SELECT * FROM competition_fids ORDER BY id ASC",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

/**
 * get all the FIDS loaded relations
 */
router.get("/getSelectedRelations", (req, res, next) => {
    x = ["1", "4"];
    pool.query(
        "SELECT * FROM competition_fids WHERE id in (" + x + ")",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

// insertFromFidsCompetitions

router.post("/insertFromFidsCompetitions", (req, res, next) => {
    const competitionsIdArray = req.body.competitionsIdArray;
    const event = req.body.event;
    const user = req.body.user;
    // serve l'evento e utente
    console.log(req.body);
    pool.query(
        "SELECT * FROM competition_fids WHERE id IN (" + competitionsIdArray + ")",
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;
                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "At least one relation " +
                        " already exsists, please choose another one " :
                        "Generic network error!",
                });
            }

            //   console.log(results.rows);

            results.rows.forEach((el) => {
                //console.log(results.rows[i]);
                pool.query(
                    'INSERT INTO competitions (license, discipline,age_group,classe,unit_type,judging_system_preliminary,judging_system_final,calculation_type,first_age_min,first_age_max,second_age_min,second_age_max,alternative_age_group,perc_fq_age,perc_fq_class,members_min,members_max,exclusive_gender,music_required,alias,dances,event,"user") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)', [
                        el.license,
                        el.discipline,
                        el.age_group,
                        el.classe,
                        el.unit_type,
                        el.judging_system_preliminary,
                        el.judging_system_final,
                        el.calculation_type,
                        el.first_age_min,
                        el.irst_age_max,
                        el.second_age_min,
                        el.second_age_max,
                        el.alternative_age_group,
                        el.perc_fq_age,
                        el.perc_fq_class,
                        el.members_min,
                        el.embers_max,
                        el.exclusive_gender,
                        el.music_required,
                        el.alias,
                        el.dances,
                        event,
                        user,
                    ],
                    (error, results32) => {
                        if (error) {
                            console.log(error);
                            let errorNumber = 500;
                            if (error.routine === "_bt_check_unique") errorNumber = 409;
                            return res.status(errorNumber).json({
                                code: errorNumber,
                                message: errorNumber === 409 ?
                                    "Relation " + " already exsists" :
                                    "Generic network error!",
                            });
                        }
                    }
                );
            });

            // qui ritorna che tutto è andato ok
            return res.status(201).json({
                message: "Relation created successfully",
                result: results.rowCount,
            });
        }
    );
});

/**
 * Get all my created relations
 */
router.get("/getMyRelations", (req, res, next) => {
    const user = req.query.user;
    //const event = req.query.event;

    pool.query(
        'SELECT * FROM competitions WHERE "user"=$1', [user],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

router.post("/addMyRelation", (req, res, next) => {
    const license = req.body.license;
    const event = req.body.events;
    const discipline = req.body.disciplines;
    const age_group = req.body.age_group;
    const classe = req.body.classe;
    const unit_type = req.body.unit_type;
    const judging_system_preliminary = req.body.judging_system_preliminary;
    const judging_system_final = req.body.judging_system_final;
    const calculation_type = req.body.calculation_type;
    const first_age_min = req.body.first_age_min;
    const first_age_max = req.body.first_age_max;
    const second_age_min = req.body.second_age_min;
    const second_age_max = req.body.second_age_max;
    const alternative_age_group = req.body.alternative_age_group;
    const perc_fq_age = req.body.perc_fq_age;
    const perc_fq_class = req.body.perc_fq_class;
    const members_min = req.body.members_min;
    const members_max = req.body.members_max;
    const exclusive_gender = req.body.exclusive_gender;
    const music_required = req.body.music_required;
    const alias = req.body.alias;
    const dances = req.body.dances;

    pool.query(
        "SELECT MAX(id) FROM competitions WHERE license = $1 AND event = $2", [license, event],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    code: 500,
                    message: "Generic network error!",
                });
            }
            maxId = null;
            if (results.rows[0].max !== null) {
                maxId = Number(results.rows[0].max) + 1;
            } else maxId = 1;

            pool.query(
                "INSERT INTO competitions (id,license, discipline,age_group,classe,unit_type,judging_system_preliminary,judging_system_final,calculation_type,first_age_min,first_age_max,second_age_min,second_age_max,alternative_age_group,perc_fq_age,perc_fq_class,members_min,members_max,exclusive_gender,music_required,alias,dances,event) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)", [
                    maxId,
                    license,
                    discipline,
                    age_group,
                    classe,
                    unit_type,
                    judging_system_preliminary,
                    judging_system_final,
                    calculation_type,
                    first_age_min,
                    first_age_max,
                    second_age_min,
                    second_age_max,
                    alternative_age_group,
                    perc_fq_age,
                    perc_fq_class,
                    members_min,
                    members_max,
                    exclusive_gender,
                    music_required,
                    alias,
                    dances,
                    event,
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        let errorNumber = 500;
                        if (error.routine === "_bt_check_unique") errorNumber = 409;
                        return res.status(errorNumber).json({
                            code: errorNumber,
                            message: errorNumber === 409 ?
                                "Relation " + " already exsists" :
                                "Generic network error!",
                        });
                    }
                    // qui ritorna che tutto è andato ok
                    return res.status(201).json({
                        message: "Relation created successfully",
                        result: results.rowCount,
                    });
                }
            );
        }
    );
});

/**
 * Util API for loading the FIDS relation table
 */
router.get("/insertRelationFromAPI", (req, res, next) => {
    const license = "FIDS";
    // Delete all rows if it's there any
    pool.query(
        "DELETE FROM competition_fids WHERE license = $1", [license],
        (error, results_) => {
            if (error) {
                throw error;
            }
        }
    );

    // var data = JSON.parse(fs.readFileSync('/src/assets/data.json', 'utf8'));

    var data_array = JSON.parse(
        fs.readFileSync(
            "/Users/tomas/Desktop/setup/backend/api/routes/relazioni.json",
            "utf8"
        )
    );
    //data_array = JSON.parse(data);

    maxId_local = 1;

    data_array.data.forEach((el, i) => {
        const discipline = 3; //el.disciplineID
        const age_group = el.ageGroup;
        const classe = "C"; //el.class
        const unit_type = el.unitTypeID;
        const judging_system_preliminary = el.judgingSystemPreliminary;
        const judging_system_final = el.judgingSystemFinal;
        const calculation_type = el.calculationType;
        const first_age_min = Number(el.FirstAgeMIN === 0 ? null : el.FirstAgeMIN);
        const first_age_max = Number(el.FirstAgeMAX === 0 ? null : el.FirstAgeMAX);
        const second_age_min = Number(
            el.SecondAgeMIN === "" ? null : el.SecondAgeMIN
        );
        const second_age_max = Number(
            el.SecondAgeMAX === "" ? null : el.SecondAgeMAX
        );
        const alternative_age_group = el.AlternativeAgeGroup;
        const perc_fq_age = el.PercFQAge;
        const perc_fq_class = el.PercFQClass;
        const members_min = el.MembersMIN;
        const members_max = el.MembersMAX;
        const exclusive_gender = el.ExclusiveGender;
        const music_required = el.MusicRequired;
        const alias = "alias";
        const dances = "TS, WCS"; //el.Dances
        const eventId = 1;

        pool.query(
            "SELECT MAX(id) FROM competition_fids WHERE license = $1", [license],
            (error, results) => {
                if (error) {
                    return res.status(500).json({
                        code: 500,
                        message: "Generic network error!",
                    });
                }

                //     if (results.rows[0].max !== null) {
                //       maxId_local = (Number(results.rows[0].max)) + 1

                pool.query(
                    "INSERT INTO competition_fids (id,license, discipline,age_group,classe,unit_type,judging_system_preliminary,judging_system_final,calculation_type,first_age_min,first_age_max,second_age_min,second_age_max,alternative_age_group,perc_fq_age,perc_fq_class,members_min,members_max,exclusive_gender,music_required,alias,dances,event) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)", [
                        i + 1,
                        license,
                        discipline,
                        age_group,
                        classe,
                        unit_type,
                        judging_system_preliminary,
                        judging_system_final,
                        calculation_type,
                        first_age_min,
                        first_age_max,
                        second_age_min,
                        second_age_max,
                        alternative_age_group,
                        perc_fq_age,
                        perc_fq_class,
                        members_min,
                        members_max,
                        exclusive_gender,
                        music_required,
                        alias,
                        dances,
                        eventId,
                    ],
                    (error, results_2) => {
                        if (error) {
                            console.log(error);
                            let errorNumber = 500;
                            if (error.routine === "_bt_check_unique") errorNumber = 409;
                            return res.status(errorNumber).json({
                                code: errorNumber,
                                message: errorNumber === 409 ?
                                    "Relation " + " already exsists" :
                                    "Generic network error!",
                            });
                        }
                    }
                );
            }
        );
    });

    // qui ritorna che tutto è andato ok
    return res.status(201).json({
        message: "Relations imported successfully",
        result: 1,
    });
});

/**
 * Gets all the events
 */
router.delete("/deleteMyRelation", (req, res, next) => {
    console.log(req.body);
    const relation = req.body;
    pool.query(
        'DELETE FROM competitions WHERE id = $1 AND license = $2 and "user" = $3 ', [relation.id, relation.license, relation.user],
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;

                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "Relation " + relation.id + " doesn't exsists" :
                        "Generic network error!",
                });
            }
            res.status(200).json(results.rows);
        }
    );
});

module.exports = router;