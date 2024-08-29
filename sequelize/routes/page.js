const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
    renderProfile,
    renderSignup,
    renderSignin,
    renderTeacherpage,
    renderTeacherResults,
    renderStudentResults,
    renderMain,
    createLesson,
    readLessons,
    readLesson,
    updateLesson,
    createPerformance,
    getPerformances,
    getPerformance,
    updatePerformance,
} = require('../controllers/page');

const router = express.Router();

router.get('/profile', isLoggedIn, renderProfile);

router.get('/signup', isNotLoggedIn, renderSignup);

router.get('/signin', renderSignin);

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

// Lesson
router.post('/create', /* isLoggedIn, isTeachers */ createLesson);

router.get('/read', /* isLoggedIn, */ readLessons);

router.get('/read/:id', /* isLoggedIn, */ readLesson);

router.put('/update/:id', /* isLoggedIn, isTeachers */ updateLesson);

// Performance
router.post('/create', /* isLoggedIn, isTachers */ createPerformance);

router.get('/read', /* isLoggedIn, */ getPerformances);

router.get('/read/:id', /* isLoggedIn, */ getPerformance);

router.put('/update/:id', /* isLoggedIn, isTachers, */ updatePerformance);

router.get('/', renderMain);

module.exports = router;
