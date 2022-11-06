const jwt = require("jsonwebtoken");
const roles = require('../enum/roles');
const { publicKey } = require('../config/jwt.config');

const verifyToken = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

const isAdmin = (req, res, next) => {
	if (req.user.role !== roles.Admin) {
		return res.status(403).send("You are not authorized to perform this action");
	}
	return next();
}

exports.verifyToken = verifyToken;
exports.isAdmin = isAdmin;