import { Router } from "express";
const router = Router();

import { getTransfer, postTransfer, updateTransfer, deleteTransfer } from '../controllers/transferController.js'

router.get('/:id/transfer', getTransfer);
    
router.post('/:id/transfer', postTransfer);
router.put('/:id/transfer', updateTransfer);
router.delete('/:id/transfer', deleteTransfer);

export default router;