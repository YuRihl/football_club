import { Router } from "express";
const router = Router();

import { getContracts, getContract, postContract, updateContract, deleteContract } from '../controllers/contractsController.js';

router.get('/:id/contracts', getContracts);
router.get('/:id/contracts/:contractId', getContract);

router.post('/:id/contracts', postContract);
router.put('/:id/contracts/:contractId', updateContract);
router.delete('/:id/contracts/:contractId', deleteContract);

export default router;