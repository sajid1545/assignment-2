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
    const result = await User.updateOne(
        { userId: id },
        {
            $set: userData,
        },
        {
            runValidators: true,
        },
    );
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

const getProductsFromOrder = async (id: string) => {
    const result = await User.findOne({ userId: id }, { _id: 0, orders: 1 });
    return result;
};

const totalProductPriceOfSpecificUserInDB = async (id: number) => {
    const result = await User.aggregate([
        {
            $match: {
                userId: id, // get user with given id
            },
        },
        {
            $unwind: '$orders', // unwind the orders array
        },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] }, // calculation the total price ( price * quantity )
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: { $toInt: { $round: ['$totalPrice', 2] } },
            },
        },
    ]);

    return result;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSpecificUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addProductIntoOrderDB,
    getProductsFromOrder,
    totalProductPriceOfSpecificUserInDB,
};
