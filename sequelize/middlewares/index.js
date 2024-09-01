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
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.isTeacher = (req, res, next) => {
    if (req.user && req.user.t_id) {
      return next();
    }
    return res.status(403).send('선생님만 접근 가능합니다.');
};

exports.isStudent = (req, res, next) => {
    if (req.user && req.user.s_id) {
        return next();
    }
    return res.status(403).send('학생만 접근 가능합니다.');
};