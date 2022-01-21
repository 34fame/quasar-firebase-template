// TODO add event logging
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_APIKEY)

module.exports = async (props) => {
   const { to, subject, html } = props
   const msg = {
      to,
      from: 'troy@34fame.com',
      subject,
      html,
   }

   if (process.env.APP_ENV === 'local') {
      console.info('mock send email', msg)
      return
   }

   try {
      await sgMail.send(msg)
      return true
   } catch (error) {
      throw new Error(error)
   }
}
