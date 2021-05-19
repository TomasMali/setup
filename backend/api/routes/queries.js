const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const CheckAuth = require("../middleware/check-auth")
const pool = require('./connection')
const sendMail = require('./sendmail')



/**
 * Gets all the users
 */
router.get('', (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})



/**
 * Inserts a new user if it doesnt exists
 * Generates an encoded password
 * Generates a random user id
 */
router.post("/register", (req, res, next) => {
    const user_ = req.body
    console.log(user_.password)

    bcrypt.hash(user_.password, 10)
        .then(hash => {
            console.log("ok 2")
                // genera un random Id
            const id = crypto.randomBytes(8).toString("hex");
            pool.query('INSERT INTO users (id, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)', [id, user_.name, user_.surname, user_.email, hash], (error, results) => {

                console.log(results)
                if (error) {
                    let errorNumber = 500
                    if (error.routine === '_bt_check_unique')
                        errorNumber = 409

                    return res.status(errorNumber).json({
                        code: errorNumber,
                        message: errorNumber === 409 ? "User " + user_.email + " already exsists" : "Generic network error!"
                    })

                }
                // qui ritorna che tutto è andato ok 
                return res.status(201).json({
                    message: "User created",
                    result: results.rowCount
                })

            })

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                message: "Generic network error!"
            })
        })


})



router.post("/login", (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    console.log(email)

    pool.query("SELECT * FROM users WHERE email = $1 ", [email], (error, results) => {
        if (error) {
            throw error
        }

        // se ho trovato l'utente a db
        if (results.rowCount > 0) {
            console.log("OKKKKKKKkk")
                // se la password coincide
            bcrypt.compare(password, results.rows[0].password, function(err_hash, result_hash) {
                if (err_hash) {
                    return res.status(401).json({
                        message: "Auth failed_Catch",
                        err: err_hash
                    })
                }
                if (result_hash == true) {
                    const token = jwt.sign({ email: results.email, id: results.id },
                        'secret_this_should_be_longer', {
                            expiresIn: "1h"
                        }
                    );

                    // send email
                    /*    
                    sendMail({
                        to: "tomasmali08@gmail.com",
                        subject: "My first email from nodejs",
                        text: "Ciao io sono tmas mali, email generato automaticamente"
                    })
                    */

                    // l'oggetto da ritornare
                    return res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        email: results.eamil
                    })
                }
                // wrong password
                return res.status(401).json({
                    code: 401,
                    message: "Wrong password"
                })

            });

        } else {
            return res.status(401).json({
                code: 401,
                message: "User does not exsists! Please signup for registration"
            })
        }

    })


})






router.post("/resetPassword", (req, res, next) => {

    const email = req.body.email

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        // se ho trovato l'utente a db
        if (results.rowCount > 0) {
            // send email
            try {
                sendMail({
                    to: email,
                    subject: "Confirmation for reseting your password",
                    html: "Please click  <a href='http://localhost:8080/changePassword?email=" + email + "'>here </a> "
                })

                return res.status(200).json({
                    status: 200
                })

            } catch (error) {
                return res.status(401).json({
                    code: 401,
                    message: "Generic network error! Please try later."
                })
            }
        } else {
            return res.status(401).json({
                code: 401,
                message: "User does not exsists! Please try with another user!"
            })
        }

    })

})




router.post("/changePassword", (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, 10)
        .then(hash => {

            pool.query('UPDATE users SET password = $1 WHERE email = $2', [hash, email], (error, results) => {

                if (error) {
                    throw error
                }
                // se ho trovato l'utente a db
                if (results.rowCount > 0) {
                    // send email
                    sendMail({
                        to: email,
                        subject: "Password successfully changed",
                        text: "Your password has been changed successfully"
                    })

                    return res.status(200).json({
                        status: 200
                    })

                } else {
                    return res.status(401).json({
                        code: 401,
                        message: "User does not exsists! Please try with another user!"
                    })
                }

            })

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                message: "Generic network error from bcrypt!"
            })
        })




})











const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
    const { name, surname } = request.body

    pool.query('INSERT INTO users (user_id, name, surname) VALUES ($1, $2, $3)', [1000234, name, surname], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results}`)
    })
}


module.exports = router;