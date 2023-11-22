import { Schema, model } from 'mongoose';

const fullNameSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
    },
});

const addressSchema = new Schema({
    street: {
        type: String,
        required: [true, 'Street is required.'],
    },
    city: {
        type: String,
        required: [true, 'City is required.'],
    },
    country: {
        type: String,
        required: [true, 'Country is required.'],
    },
});

const ordersSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
    },
});

const userSchema = new Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required.'],
    },
    userName: {
        type: String,
        required: [true, 'User name is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, 'Full name is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required.'],
    },
    orders: {
        type: ordersSchema,
    },
});

export const User = model('User', userSchema);
