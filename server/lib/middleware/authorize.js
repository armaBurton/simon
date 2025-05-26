const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Check req.user to ensure the user's email is 'admin'
  try {
    const { session } = req.cookies;

    const payload = jwt.verify(session, process.env.JWT_SECRET);

    if (payload.email != "admin") {
      const error = new Error("You do not have access to view this page");
      error.status = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
