import { Router } from "express";
const router = Router();

import { getTrainers, getTrainer, postTrainer, updateTrainer, deleteTrainer } from '../controllers/trainersController.js'
import transferRouter from './transferRouter.js';
import contractsRouter from './contractsRouter.js';

router.use(transferRouter);
router.use(contractsRouter);

router.get('/', getTrainers);
router.get('/:id', getTrainer);

router.post('/', postTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

export default router;