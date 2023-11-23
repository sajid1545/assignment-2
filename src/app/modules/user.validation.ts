// validation using Zod

import { z } from 'zod';

const fullNameValidationSchema = z.object({
    firstName: z.string({
        required_error: 'First name is required.',
        invalid_type_error: 'First name must be a string.',
    }),
    lastName: z.string({
        required_error: 'Last name is required.',
        invalid_type_error: 'Last name must be a string.',
    }),
});

const addressValidationSchema = z.object({
    street: z.string({
        invalid_type_error: 'Street must be a string.',
        required_error: 'Street is required.',
    }),
    city: z.string({
        invalid_type_error: 'City must be a string.',
        required_error: 'City is required.',
    }),
    country: z.string({
        invalid_type_error: 'Country must be a string.',
        required_error: 'Country is required.',
    }),
});

export const ordersValidationSchema = z.object({
    productName: z.string({
        invalid_type_error: 'Product name must be a string.',
        required_error: 'Product name is required.',
    }),
    price: z.number({
        invalid_type_error: 'Price must be a number.',
        required_error: 'Price is required.',
    }),
    quantity: z.number({
        invalid_type_error: 'Quantity must be a number.',
        required_error: 'Quantity is required.',
    }),
});

const userValidationSchema = z.object({
    userId: z.number({
        required_error: 'User ID is required.',
        invalid_type_error: 'User ID must be a number.',
    }),
    username: z.string({
        required_error: 'User name is required.',
        invalid_type_error: 'User name must be a string.',
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }),
    fullName: fullNameValidationSchema,
    age: z.number({
        required_error: 'Age is required.',
        invalid_type_error: 'Age must be a number.',
    }),
    email: z
        .string({
            required_error: 'Email is required.',
            invalid_type_error: 'Email must be a string.',
        })
        .email({
            message: 'Invalid email address.',
        }),
    isActive: z.boolean({
        required_error: 'Active status is required.',
        invalid_type_error: 'Active status must be a boolean.',
    }),
    hobbies: z.string().array().min(1, 'Hobbies are required.'),
    address: addressValidationSchema,
    orders: z.array(ordersValidationSchema),
});

export default userValidationSchema;
