
const mailGun = require('nodemailer-mailgun-transport')
const nodemailer = require('nodemailer')


const auth = {
    auth: {
        api_key: 'key-5776f27219a2e7670c7aa6127eec4b3c',
        domain:'sandbox5dca23b5035e496fad67c31c6d1a6f49.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const current_date = Date();

const sendMail = ( subject, text, author, category) => {
    const mailOptions = {
        // from: 'nguyentienthanh.tgdd@gmail.com',
        from: 'nguyentienthanh.tgdd@gmail.com',
        to: 'hoanghiep3411@gmail.com',
        subject: 'Notification Email',
        text,
        html: 
        '<p>A new idea has been submitted to the system: </p>' +
        '<p style ="text-transform: capitalize;"><b>Created At: </b>' + current_date + '</p><br>' +
        '<h3 style ="text-transform: uppercase; color: red; text-align: center;"> '+ subject + '</h3>' +
        '<p style ="text-transform: capitalize;"><b>Idea detail: </b>'+ text + '</p><br>'+
        '<p style ="text-transform: capitalize;"><b>Author: </b>'+ author + '</p>' +
        '<p style ="text-transform: capitalize;"><b>Category name: </b>'+ category + '</p>',
    }

    transporter.sendMail(mailOptions)
}

module.exports = sendMail;