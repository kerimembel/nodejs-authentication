const { validationResult } = require('express-validator/check');

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // To get the first error message
        const extractedErrors = []
        errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(400).json({ status: false, body: extractedErrors });
    }
    next();
}