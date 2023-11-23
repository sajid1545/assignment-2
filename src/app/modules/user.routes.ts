import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUsers);
router.post('/', userControllers.createUser);

router.get('/:userId', userControllers.getSpecificUser);
router.put('/:userId', userControllers.updateUserData);
router.delete('/:userId', userControllers.deleteUser);

router.get('/:userId/orders', userControllers.allOrdersOfUser);
router.get('/:userId/orders', userControllers.allOrdersOfUser);
router.put('/:userId/orders', userControllers.addProductIntoOrder);
router.get(
    '/:userId/orders/total-price',
    userControllers.totalProductPriceOfSpecificUser,
);

export const userRoutes = router;
