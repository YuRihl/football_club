import { Router } from "express";
const router = Router();

import { getSquad, postFootballer, updateFootballer, deleteFootballer, getFootballer } from '../controllers/squadController.js';
import transferRouter from './transferRouter.js';
import contractsRouter from './contractsRouter.js';

router.use(transferRouter);
router.use(contractsRouter);

router.get('/', getSquad);
router.get('/:id', getFootballer);

router.post('/', postFootballer);
router.put('/:id', updateFootballer);
router.delete('/:id', deleteFootballer);

export default router;