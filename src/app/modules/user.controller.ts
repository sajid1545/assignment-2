import { Request, Response } from 'express';
import { User } from './user.model';
import { userServices } from './user.services';
import userValidationSchema from './user.validation';

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
                code: 404,
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
                code: 404,
                message: 'Something went wrong while getting all Users',
                fullError: error,
            },
        });
    }
};

const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;

        if (await User.isUserExists(userID)) {
            const result = await userServices.getSpecificUserFromDB(userID);

            const { password: pwd, ...rest } = result!.toObject();

            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: rest,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
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
                code: 404,
                message: 'Something went wrong while getting specific User',
                fullError: error,
            },
        });
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getSpecificUser,
};
