const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "auto_generate_server@outlook.it",
        pass: "..Tomas92"

    }
});



let sendEmail = function(options) {

    options.from = "auto_generate_server@outlook.it"

    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log("Send: " + info.response)
        }
    })
}



module.exports = sendEmail;