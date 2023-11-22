import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUsers);
router.post('/', userControllers.createUser);
router.get('/:userID', userControllers.getSpecificUser);

export const userRoutes = router;
