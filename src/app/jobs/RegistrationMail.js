import Mail from '../lib/Mail'

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { student } = data
    
    await Mail.transporter.sendMail({
      from: 'Queue Test <noreply@gympoint.com.br>',
      to: `${student.name} <${student.email}>`,
      subject: 'Cadastro do usuário',
      html: `Olá, ${student.name}, bem-vindo ao gympoint!'`
    })
  }
}
