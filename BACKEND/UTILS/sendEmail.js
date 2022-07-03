const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        }
    })

    const mailOptions = {
        form: process.env.SMTP_MAI,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail