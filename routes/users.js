import express from 'express';
import { getUsers, addUser } from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/addUser', addUser);

export default router;