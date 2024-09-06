exports.isLoggedIn = (req, res, next) => {
    
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인한 상태입니다.');
    }
};

const cors = require('cors')

exports.corsDomain = async (req, res, next) => {
    cors({
        origin: req.get('origin'),
        credentials: include,
        optionsSuccessStatus: 200,
        allowedHeaders: 'Access-Control-Allow-Origin',
    })(req, res, next)
}

exports.isTeacher = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'teacher') {
        return next();
    }
    return res.status(403).send('선생님만 접근 가능합니다.');
};

exports.isStudent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'student') {
        return next();
    }
    return res.status(403).send('학생만 접근 가능합니다.');
};
