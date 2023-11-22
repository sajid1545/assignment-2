import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
    const result = await User.create(userData);
    return result;
};

const getAllUsersFromDB = async () => {
    const result = await User.aggregate([
        { $match: {} },
        {
            $project: {
                _id: 0,
                username: 1,
                fullName: {
                    firstName: 1,
                    lastName: 1,
                },
                age: 1,
                email: 1,
                address: {
                    street: 1,
                    city: 1,
                    country: 1,
                },
            },
        },
    ]);

    return result;
};

const getSpecificUserFromDB = async (id: string) => {
    const result = await User.findOne({ userId: id });
    return result;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSpecificUserFromDB,
};
