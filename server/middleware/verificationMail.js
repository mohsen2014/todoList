const nodemailer = require('nodemailer');
module.exports = class mail{
  constructor(to ,subject ,text ,html){
    this.transporter = nodemailer.createTransport('smtps://mohsen.emami313%40gmail.com:memohsen1@smtp.gmail.com');
    // nodemailer.createTransport({
    //     host: 'smtp.example.com',
    //     port: 465,
    //     secure: true, // secure:true for port 465, secure:false for port 587
    //     auth: {
    //         user: 'mohsen.emami313@gmail.com',
    //         pass: 'memohsen1'
    //     }
    // });

    this.mailOptions = {
        from: '"mohsen Emami" <mohsen.emami313@gmail.com>', // sender address
        to: to,
        subject: subject, 
        text: text,
        html: html
    };


  }

  sendMail(done ,faild){
    this.transporter.sendMail(this.mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            faild(error)
        }
        done(info);
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

}
// create reusable transporter object using the default SMTP transport

// setup email data with unicode symbols

// send mail with defined transport object