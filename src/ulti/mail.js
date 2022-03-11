
const mailGun = require('nodemailer-mailgun-transport')
const nodemailer = require('nodemailer')


const auth = {
    auth: {
        api_key: 'key-5776f27219a2e7670c7aa6127eec4b3c',
        domain:'sandbox5dca23b5035e496fad67c31c6d1a6f49.mailgun.org'

        // api_key: process.env.API_KEY || 'key-5776f27219a2e7670c7aa6127eec4b3c',
        // domain: process.env.DOMAIN || 'sandbox5dca23b5035e496fad67c31c6d1a6f49.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        // from: 'nguyentienthanh.tgdd@gmail.com',
        from: 'nguyentienthanh.tgdd@gmail.com',
        to: 'thanh.kira_flynn@yahoo.com',
        subject,
        text
    }

    transporter.sendMail(mailOptions, function (err,data){
        if(err){
            cb(err, null) 
        } else {
            cb(null, data)
        }
    })
}

module.exports = sendMail;