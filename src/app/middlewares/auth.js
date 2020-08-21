import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import JwtConfig from '../../config/JwtConfig'

export default async (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(400).json({ error: 'Token not Provided' })
  }

  //catch the last value of array with split
  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, JwtConfig.secret)

    req.userId = decoded.id

    return next()
  }
  catch (err) {
    return res.status(400).json({ error: 'Token invalid' })
  }
}
