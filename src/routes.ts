import { Router } from 'express'

import AuthController from '@controllers/auth.controller'
import UserController from '@controllers/user.controller'
import ToolController from '@controllers/tool.controller'

import authMiddlewares from './app/middlewares/auth.middlewares'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world' })
})

router.get('/tools', authMiddlewares, ToolController.getTool)
router.post('/tools', authMiddlewares, ToolController.registerTool)
router.delete('/tools/:id', authMiddlewares, ToolController.deleteTool)

router.post('/users', UserController.register)
router.post('/auth', AuthController.auth)

export default router
