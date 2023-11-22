import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;

        // zod parsed data
        const zodParsedData = userValidationSchema.parse(userData);

        const result = await userServices.createUserIntoDB(zodParsedData);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: error.code,
                message: error.message,
            },
        });
    }
};

export const userControllers = {
    createUser,
};
