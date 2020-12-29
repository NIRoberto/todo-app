import express from 'express';
import { auth } from '../middleware/auth';
import {
  getWrestles,
  getOneWrestle,
  postWrestles,
  updateWrestles,
  deleteWrestles,
} from '../controllers/wrestleNameController';

const router = express.Router();

router.get('/wrestles', auth, getWrestles);
router.get('/wrestles/:id', auth, getOneWrestle);

router.post('/wrestles/create', auth, postWrestles);
router.put('/wrestles/update/:id', auth, updateWrestles);
router.delete('/wrestles/delete/:id', auth, deleteWrestles);

export default router;
