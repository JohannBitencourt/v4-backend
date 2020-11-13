import { Router } from 'express'
import ToolController from '@controllers/tool.controller'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world' })
})

router.get('/tools', ToolController.getToolById)
router.post('/tools', ToolController.registerTool)
router.delete('/tools/:id', ToolController.deleteTool)

export default router
