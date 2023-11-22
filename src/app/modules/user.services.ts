import { IOrder, IUser } from './user.interface';
import { User } from './user.model';

// user management
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
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            },
        },
    ]);

    return result;
};

const getSpecificUserFromDB = async (id: string) => {
    const result = await User.findOne({ userId: id });
    return result;
};
const updateUserIntoDB = async (id: string, userData: IUser) => {
    const result = await User.updateOne({ userId: id }, userData);
    return result;
};

const deleteUserFromDB = async (id: string) => {
    const result = await User.deleteOne({ userId: id });
    return result;
};

// order management
const addProductIntoOrderDB = async (id: string, orderData: IOrder) => {
    const result = await User.updateOne(
        { userId: id },
        { $addToSet: { orders: orderData } },
    );
    return result;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSpecificUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addProductIntoOrderDB,
};
