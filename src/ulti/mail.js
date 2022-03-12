
const mailGun = require('nodemailer-mailgun-transport')
const nodemailer = require('nodemailer')


const auth = {
    auth: {
        api_key: 'key-5776f27219a2e7670c7aa6127eec4b3c',
        domain:'sandbox5dca23b5035e496fad67c31c6d1a6f49.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = ( subject, text, author, category) => {
    const mailOptions = {
        // from: 'nguyentienthanh.tgdd@gmail.com',
        from: 'nguyentienthanh.tgdd@gmail.com',
        to: 'thanh.kira_flynn@yahoo.com',
        subject: 'An idea has been uploaded ',
        text,
        html: 
        '<h3 style ="text-transform: uppercase; color: red">Name: '+ subject + '</h3>' +
        '<p style ="text-transform: capitalize;"> '+ text + '</p>'+
        '<span style ="text-transform: capitalize; color: lightgrey">Author: '+ author + '</span><br>' +
        '<span style ="text-transform: capitalize; font-size:8px">Category name: '+ category + '</span>',
    }

    transporter.sendMail(mailOptions)
}

module.exports = sendMail;