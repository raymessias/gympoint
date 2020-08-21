import * as yup from 'yup'
import jwt from 'jsonwebtoken'
import JwtConfig from '../../config/JwtConfig'



import User from '../models/User'

class SessionController {

  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validations fails')
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password doesnt match' })
    }

    const { id, name } = user

    return res.json(
      {
        user: { id, name, email },
        // Passando o id do user para usar posteriormente
        token: jwt.sign({ id }, JwtConfig.secret, { expiresIn: JwtConfig.expiresIn })
      }
    )
  }

}

export default new SessionController()
