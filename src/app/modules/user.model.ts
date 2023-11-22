import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';

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
        unique: true,
    },
    username: {
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
        required: [true, 'Active status is required.'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required.'],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required.'],
    },
    orders: {
        type: ordersSchema,
        required: false,
    },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

export const User = model('User', userSchema);
