import Mail from '../lib/Mail'

export default {
  key: 'EnrollmentMail',
  async handle({ data }) {
    const { enrollMail } = data
    
    await Mail.transporter.sendMail({
      from: 'GymPoint staff <noreply@gympoint.com>',
      to: `${enrollMail.name} <${enrollMail.email}>`,
      subject: 'Matrícula realizada com sucesso',
      html: `Olá ${enrollMail.name}, seja bem-vindo! <br/>
        Abaixo seguem mais informações da sua matrícula.<br/>
        Plano: ${enrollMail.plan}<br/>
        Data de término: ${enrollMail.end_date}<br/>
        Valor Mensal: ${enrollMail.priceMonth}<br/>
        Valor Total: ${enrollMail.price}<br/>`
    })

  }
}
