import { Router } from "express";
import * as handler from './handlers'

const router = Router()

router.get('/', handler.findAll)
router.get('/:id', handler.findOne)

router.post('/', handler.create)
router.patch('/:id', handler.update)

router.delete('/:id',handler.deleteOne);
  

export default router