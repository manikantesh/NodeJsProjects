
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.sendEmail = function(_toEmail,_subject,_body,callback){
    sgMail.send({
        to:_toEmail,
        from:'kmanikantesh@bsu.edu',
        subject:_subject,
        text:_body
    },function(){
        callback();
    }) 
    .catch((error) => {
        console.error(error)
      })
}
 