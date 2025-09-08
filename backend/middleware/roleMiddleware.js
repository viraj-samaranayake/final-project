const requireRole = (role) => (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { requireRole };
