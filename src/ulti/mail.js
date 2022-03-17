
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
        '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">' +
            '<tr>' +
            '<td align="center" style="padding:0;">' +
                '<table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">' +
                '<tr>' +
                    '<td align="center" style="padding:0">' +
                    '<img src="https://techcrunch.com/wp-content/uploads/2017/10/gmail-grid.png" alt="" width="600" style="height:auto;display:block;" />' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td style="padding:36px 30px 42px 30px;">' +
                    '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">' +
                        '<tr>' +
                        '<td style="padding:0 0 36px 0;color:#153643;">' +
                            '<h1 style="color:black;font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">A new idea has been submitted to the system</h1>' +
                            '<p style="color: #153643;margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Created At: </b>' + current_date + '</p>' +
                            '<p style="color: red;text-transform: uppercase;margin:0 0 12px 0;font-size:24px;line-height:24px;font-family:Arial,sans-serif;">Title: '+ subject + '</p>' +
                            '<p style="color: #153643;text-transform: capitalize;margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Idea detail: </b>'+ text + '</p>'+
                            '<p style="color: #153643;text-transform: capitalize;margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Author: </b>'+ author + '</p>' +
                            '<p style="color: #153643;text-transform: capitalize;margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Category name: </b>'+ category + '</p>' +
                            '<p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">More details</a></p>' +
                        '</td>' +
                        '</tr>' +
                    '</table>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td style="padding:30px;background:#ee4c50;">' +
                    '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">' +
                        '<tr>' +
                        '<td style="padding:0;width:50%;" align="left">' +
                            '<p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">' +
                            '&reg; FearOG, University of Greenwich 2022<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>' +
                            '</p>' +
                        '</td>' +
                        '<td style="padding:0;width:50%;" align="right">' +
                            '<table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">' +
                            '<tr>' +
                                '<td style="padding:0 0 0 10px;width:38px;">' +
                                '<a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>' +
                                '</td>' +
                                '<td style="padding:0 0 0 10px;width:38px;">' +
                                '<a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>' +
                                '</td>' +
                            '</tr>' +
                            '</table>' +
                        '</td>' +
                        '</tr>' +
                    '</table>' +
                    '</td>' +
                '</tr>' +
                '</table>' +
            '</td>' +
            '</tr>' +
        '</table>',
    }

    transporter.sendMail(mailOptions)
}

module.exports = sendMail;

 