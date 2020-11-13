import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import User from '@models/user.model'

class UserController {
  async register (req: Request, res: Response) {
    const repository = getRepository(User)
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    if (!(await schema.isValid(req.body))) {
      return res.sendStatus(400).json({ error: 'Make sure your data is correct' })
    }
    const { name, email, password } = req.body

    const userExists = await repository.findOne({ where: { email } })

    if (userExists) {
      return res.sendStatus(409)
    }

    const user = repository.create({ name, email, password })
    await repository.save(user)

    return res.json(user)
  }
}

export default new UserController()
