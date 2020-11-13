import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/auth.config'
import User from '@models/user.model'

class AuthController {
  async auth (req: Request, res: Response) {
    const repository = getRepository(User)
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Make sure your data is correct' })
    }

    const { email, password } = req.body

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.sendStatus(401)
    }
    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.expiresIn })
    delete user.password

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController()
