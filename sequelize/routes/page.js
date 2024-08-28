const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
    renderProfile,
    renderSignup,
    renderSignin,
    renderAlarm,
    renderTeacherpage,
    renderTeacherResults,
    renderStudentResults,
    renderMain
} = require('../controllers/page');

const router = express.Router();

router.get('/profile', isLoggedIn, renderProfile);

router.get('/signup', isNotLoggedIn, renderSignup);

router.get('/signin', renderSignin);

router.get('/alarm', renderAlarm);

router.get('/teacherpage', (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return renderTeacherpage(req, res, next);
    } else {
        res.status(403).send('접근 권한이 없습니다');
    }
});

router.get('/myresults', (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return renderTeacherResults(req, res, next);
    } else if (req.user && req.user.role === 'student') {
        return renderStudentResults(req, res, next);
    } else {
        res.status(403).send('접근 권한이 없습니다');
    }
});

router.get('/', renderMain);

module.exports = router;
