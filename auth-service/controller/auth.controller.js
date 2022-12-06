require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { privateKey } = require('../config/jwt.config');
const roles = require('../enum/roles');
const status = require('../enum/user-status');

class AuthController {

    constructor(_userService) {
        this.userService = _userService;
        this.createAdminUser();
    }

    register = async (req, res) => {
        try {
            const { email, password } = req.body;

            const oldUser = await this.userService.isUserExists(email);

            if (oldUser.body > 0) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            req.body.password = encryptedPassword;
            const user = await this.userService.create(req.body);

            if (!user.success) {
                res.status(500).json(user);
                return;
            }

            // Create token
            const token = jwt.sign(
                { user_id: user.body._id, role: user.body.role },
                privateKey,
                { algorithm: 'RS256', expiresIn: '1d' }
            );
            // Save user token
            user.token = token;
            // Return new user
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate if user exist in our database
            const user = await (await this.userService.findOne({ email })).body;

            const response = { status: true, user: user };

            if (user && (await bcrypt.compare(password, user.password))) {

                // Create token
                const token = jwt.sign(
                    { user_id: user._id, role: user.role },
                    privateKey,
                    { algorithm: 'RS256', expiresIn: '1d' }
                );
                response.token = token;

                // Return User
                res.status(200).json(response);
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
        }
    }

    changePassword = async (req, res) => {
        try {
            const { old_password, new_password, confirm_password } = req.body;

            const user = await (await this.userService.getById(req.query.id)).body;

            if (user && (await bcrypt.compare(old_password, user.password))) {
                if (new_password === confirm_password) {
                    const encryptedPassword = await bcrypt.hash(new_password, 10);
                    const result = await this.userService.update(req.query.id, { password: encryptedPassword });
                    res.status(200).json(result);
                } else {
                    res.status(400).send("New Password and Confirm Password does not match");
                }
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await (await this.userService.findOne({ email })).body;

            if (user) {


                // Return User
                res.status(200).json({ status: true, user: user, token: token });
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }

    resetPassword = async (req, res) => {
        try {
            const { password, confirm_password } = req.body;

            if (password === confirm_password) {
                const encryptedPassword = await bcrypt.hash(password, 10);
                const result = await this.userService.update(req.query.id, { password: encryptedPassword });
                res.status(200).json(result);
            } else {
                res.status(400).send("New Password and Confirm Password does not match");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async createAdminUser() {

        const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
        const body = {
            first_name: "ADMIN",
            last_name: "ADMIN",
            email: ADMIN_EMAIL,
            password: await bcrypt.hash(ADMIN_PASSWORD, 10),
            role: roles.Admin,
            status: status.Active
        }
        const result = await this.userService.create(body);
        if (result.success) {
            console.log("Admin user created");
        } else {
            console.log("Admin user already exists");
        }
    }
}

module.exports = AuthController;