const express = require('express');
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

router.get('/profile', renderProfile);

router.get('/signup', renderSignup);

router.get('/signin', renderSignin);

router.get('/alarm', renderAlarm);

router.get('/teacherpage', (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return renderTeacherpage(req, res, next); // 선생님 페이지 렌더링
    } else {
        res.status(403).send('접근 권한이 없습니다'); // 권한이 없는 경우
    }
});

router.get('/myresults', (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return renderTeacherResults(req, res, next); // 선생님 결과 페이지 렌더링
    } else if (req.user && req.user.role === 'student') {
        return renderStudentResults(req, res, next); // 학생 결과 페이지 렌더링
    } else {
        res.status(403).send('접근 권한이 없습니다'); // 권한이 없는 경우
    }
});

router.get('/', renderMain);

module.exports = router;