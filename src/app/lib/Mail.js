import nodemailer from 'nodemailer'
import mailConfig from '../../config/MailConfig'

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    })

  }

}

export default new Mail()
