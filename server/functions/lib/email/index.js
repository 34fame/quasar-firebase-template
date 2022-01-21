// TODO add event logging
const sendgrid = require('../../services/sendgrid')
const templates = require('./templates')

exports.sendRegisterResponse = async ({ to, name, subject = 'Welcome Email' }) => {
   try {
      const body = templates.register({ name })
      const payload = {
         to,
         subject,
         html: body,
      }
      await sendgrid(payload)
      return true
   } catch (error) {
      throw new Error(error)
   }
}

exports.sendPasswordReset = async ({
   to,
   name,
   password,
   subject = 'Password Reset',
}) => {
   try {
      const body = templates.passwordReset({ to, name, password })
      const payload = {
         to,
         subject,
         html: body,
      }
      await sendgrid(payload)
      return true
   } catch (error) {
      throw new Error(error)
   }
}
