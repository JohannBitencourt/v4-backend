import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Tool from '@models/tool.model'

class ToolController {
  async getToolById (req: Request, res: Response) {
    const repository = getRepository(Tool)
    const tools = await repository.find(req.body.id)
    return res.json(tools)
  }

  async registerTool (req: Request, res: Response) {
    try {
      const repository = getRepository(Tool)
      const tool = repository.create(req.body)
      await repository.save(tool)

      return res.json(tool)
    } catch {
      return res.sendStatus(409)
    }
  }

  async deleteTool (req: Request, res: Response) {
    const repository = getRepository(Tool)
    const tool = await repository.delete(req.params.id)

    return res.json(tool)
  }
}

export default new ToolController()
