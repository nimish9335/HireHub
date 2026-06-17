const isRecruiter = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        });
    }

    if (req.user.role !== "recruiter") {
        return res.status(403).json({
            message: "Access denied",
            success: false
        });
    }

    next();
};

const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied",
            success: false
        });
    }

    next();
};

module.exports = {
    isRecruiter,
    isAdmin
};