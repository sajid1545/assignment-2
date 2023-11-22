import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUsers);
router.post('/', userControllers.createUser);
router.get('/:userID', userControllers.getSpecificUser);
router.put('/:userID', userControllers.updateUserData);
router.delete('/:userID', userControllers.deleteUser);
router.put('/:userID/orders', userControllers.addProductIntoOrder);

export const userRoutes = router;
