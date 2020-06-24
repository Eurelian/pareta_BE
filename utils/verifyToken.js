const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) res.status(401).send("Unauthorized Access");

	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send("Invalid Token");
	}
};

module.exports = authenticate;
