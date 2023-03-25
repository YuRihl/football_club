import { Router } from "express";
const router = Router();

import squadRouter from './squadRouter.js';
import trainersRouter from './trainersRouter.js';
import resultsController from './resultsRouter.js';

router.use('/squad', squadRouter);
router.use('/trainers', trainersRouter);
router.use('/results', resultsController);

export default router;