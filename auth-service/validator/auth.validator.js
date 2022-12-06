const { body } = require('express-validator/check');
const roles = require('../enum/roles');

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email')
                    .exists().withMessage('Email is required')
                    .isEmail().withMessage('Email is invalid'),
                body('password')
                    .exists().withMessage('Password is required')
                    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
            ];
        }
        case 'register': {
            return [
                body('email')
                    .exists().withMessage('Email is required')
                    .isEmail().withMessage('Email is invalid'),
                body('password')
                    .exists().withMessage('Password is required')
                    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
                body('first_name')
                    .exists().withMessage('First name is required')
                    .isString().withMessage('First name must be a string'),
                body('last_name')
                    .exists().withMessage('Last name is required')
                    .isString().withMessage('Last name must be a string'),
                body('role')
                    .isIn([roles.User ]).withMessage('Invalid role')
            ];
        }
        case 'changePassword': {
            return [
                body('old_password')
                    .exists()
                    .withMessage('Old password is required')
                    .isLength({ min: 5 })
                    .withMessage('Old password must be at least 5 characters long'),
                body('new_password')
                    .exists()
                    .withMessage('New password is required')
                    .isLength({ min: 5 })
                    .withMessage('New password must be at least 5 characters long'),
                body('confirm_password')
                    .exists()
                    .withMessage('Confirm password is required')
                    .isLength({ min: 5 })
                    .withMessage('Confirm password must be at least 5 characters long')
            ];
        }
        case 'forgotPassword': {
            return [
                body('email')
                    .exists().withMessage('Email is required')
                    .isEmail().withMessage('Email is invalid'),
            ];
        }
        case 'resetPassword': {
            return [
                body('token')
                    .exists().withMessage('Token is required'),
                body('password')
                    .exists().withMessage('Password is required')
                    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
                body('confirm_password')
                    .exists().withMessage('Confirm password is required')
                    .isLength({ min: 5 }).withMessage('Confirm password must be at least 5 characters long')
            ];
        }
        default: {
            return [];
        }
    }
};