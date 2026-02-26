const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toUpperCase(); // Assuming req.user is set by auth middleware
    if (!allowedRoles.map(r => r.toUpperCase()).includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = roleMiddleware;
