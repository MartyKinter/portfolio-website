const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const config = require('./config');


const PORT = process.env.PORT || 5001;

//Middleware
app.use('/assets', express.static('assets'));
app.use(express.json());


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: config.user,
            pass: config.pass
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'kinter.marty@yahoo.com',
        subject: `contact form message from ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});