import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../config';
import { User } from './user.model';
import { userServices } from './user.services';
import userValidationSchema, {
    ordersValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;

        // zod parsed data
        const zodParsedData = userValidationSchema.parse(userData);

        const result = await userServices.createUserIntoDB(zodParsedData);

        const { password: pwd, ...rest } = result.toObject();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: rest,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while creating an User',
            error: {
                code: 500,
                message: 'Something went wrong while creating an User',
                fullError: error,
            },
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while getting all Users',
            error: {
                code: 500,
                message: 'Something went wrong while getting all Users',
                fullError: error,
            },
        });
    }
};

const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (await User.isUserExists(userId)) {
            const result = await userServices.getSpecificUserFromDB(userId);

            const { password: pwd, ...rest } = result!.toObject();

            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: rest,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong while getting specific User',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while getting specific User',
            error: {
                code: 500,
                message: 'Something went wrong while getting specific User',
                fullError: error,
            },
        });
    }
};

const updateUserData = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;

        // zod parsed data
        const zodParsedData = userValidationSchema.parse(userData);

        // hashing parsed password
        if (zodParsedData.password) {
            zodParsedData.password = await bcrypt.hash(
                zodParsedData.password,
                Number(config.bcrypt_salt_rounds),
            );
        }

        if (await User.isUserExists(userId)) {
            const result = await userServices.updateUserIntoDB(
                userId,
                zodParsedData,
            );

            const updatedUser =
                await userServices.getSpecificUserFromDB(userId);

            const { password: pwd, ...rest } = updatedUser!.toObject();

            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: rest,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong while updating User',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while updating User',
            error: {
                code: 500,
                message: 'Something went wrong while updating User',
                fullError: error,
            },
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (await User.isUserExists(userId)) {
            const result = await userServices.deleteUserFromDB(userId);

            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong while deleting User',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting User',
            error: {
                code: 500,
                message: 'Something went wrong while deleting User',
                fullError: error,
            },
        });
    }
};

const addProductIntoOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { product } = req.body;

        const parsedOrderValidationData = ordersValidationSchema.parse(product);

        if (await User.isUserExists(userId)) {
            const result = await userServices.addProductIntoOrderDB(
                userId,
                parsedOrderValidationData,
            );

            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong while adding product into order',
                error: {
                    code: 404,
                    description: 'User not found',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while adding product into order',
            error: {
                code: 500,
                message: 'Something went wrong while adding product into order',
                fullError: error,
            },
        });
    }
};

const allOrdersOfUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await userServices.allOrdersOfUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching order',
            error: {
                code: 500,
                message: 'Something went wrong while fetching order',
                fullError: error,
            },
        });
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getSpecificUser,
    updateUserData,
    deleteUser,
    addProductIntoOrder,
    allOrdersOfUser,
};
