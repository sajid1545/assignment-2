import { Request, Response } from 'express';
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
                err: error,
            },
        });
    }
};

export const userControllers = {
    createUser,
};
