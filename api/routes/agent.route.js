import express from 'express'
import { createAgent} from '../controllers/agent.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createAgent)
// router.delete('/delete/:id', verifyToken, deleteListing)
// router.post('/update/:id', verifyToken, updateListing)
// router.get('/get/:id', getListing);



export default router;