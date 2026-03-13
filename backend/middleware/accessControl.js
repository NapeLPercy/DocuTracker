const jwt = require("jsonwebtoken");

/*
JWT payload structure:

{
  persal_number: account.persal_number,
  role: account.role,
  email: account.email
}
*/

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";

  // Expect: Authorization: Bearer token
  const [, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Missing token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}


/*
Role middleware
Usage example:

router.post("/users", requireAuth, requireRole("MANAGER"), controller)
*/

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
}

module.exports = {
  requireAuth,
  requireRole,
};