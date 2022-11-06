const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');
const { validate } = require('../validator/auth.validator.js');
const { checkRules } = require('../validator/rule_checker');
const UserService = require('../service/user.service.js');

const controller = new AuthController(new UserService());

router.post('/login', validate('login'), checkRules, controller.login);
router.post('/register', validate('register'), checkRules, controller.register);
router.post('/change-password', validate('changePassword'), checkRules, controller.changePassword);
router.post('/forgot-password', validate('forgotPassword'), checkRules, controller.forgotPassword);
router.post('/reset-password', validate('resetPassword'), checkRules, controller.resetPassword);

module.exports = router;