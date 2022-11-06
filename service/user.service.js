const MongooseService = require('./mongoose.service');
const UserModel = require('../model/user');

class UserService {

    constructor() {
        this.mongooseService = new MongooseService(UserModel);
    }

    async create(body) {
        try {
            const result = await this.mongooseService.create(body);
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async getAll() {
        try {
            const result = await this.mongooseService.getAll();
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async getById(id) {
        try {
            const result = await this.mongooseService.getById(id);
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async findOne(query) {
        try {
            const result = await this.mongooseService.findOne(query);
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async update(id, body) {
        try {
            body.updated_at = new Date();
            const result = await this.mongooseService.update(id, body);
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async delete(id) {
        try {
            const result = await this.mongooseService.delete(id);
            return { success: true, body: result };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async count(query) {
        try {
            const result = await this.mongooseService.count(query);
            return result;
        } catch (error) {
            return { success: false, error: error };
        }
    }

    async approveMail(body) {
        try {
            const result = await this.mailService.checkActivationCode(body);
            if (result) {
                const user = await this.findOne({ email: body.mail_address });
                if (user.success) {
                    user.body.email_verified = true;
                    user.body.status = 'Active';
                    await this.update(user.body._id, user.body);
                    return { success: true, body: user.body };
                }
                return { success: false, body: null };
            }
            return { success: false, body: result };
        } catch (error) {
            return { success: false, body: error };
        }
    }

    async count() {
        try {
            const result = await this.mongooseService.count({});
            return { success: true, body: result };
        } catch (error) {
            return { success: false, body: error };
        }
    }

    async isUserExists(email) {

        try {
            let result = await this.mongooseService.count({ email: email });
            return { success: true, body: result };
        } catch (error) {
            return { success: false, body: error };
        }
    }
}

module.exports = UserService;