const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/contact', async (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });
    const mail = {
        from: `${name}`,
        to: 'alexboss00852@gmail.com',
        subject: "Contact Form Submission - PortFolio",
        html:
            ` <p> Name: ${name}</p>
        <p> Email: ${email}</p>
        <p> Phone: ${phone}</p>
        <p> Message: ${message}</p>`

    }
    await transporter.sendMail(mail, (err, document) => {
        if (err) {
            res.json(err)
        } else {
            res.send(document)
        }
    });


})
app.listen(process.env.PORT || 5000)
