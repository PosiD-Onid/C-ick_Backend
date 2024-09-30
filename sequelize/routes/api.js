const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn, isTeacher, isStudent } = require('../middlewares');
const { s_signup, t_signup, signin, checkLoginStatus, signout } = require('../controllers/auth');
const {
    renderProfile,
    renderStudentsMain,
    renderTeachersMain,
    renderOnboarding,
    renderTeacherpage,
    createLesson,
    readLessons,
    readLesson,
    updateLesson,
    createPerformance,
    readPerformances,
    readPerformance,
    updatePerformance,
    createEvaluation,
    readAllEvaluationsForTeacher,
    readAllEvaluationsForStudent,
    updateEvaluationScore,
    updateEvaluationCheck,
} = require('../controllers/page');

const router = express.Router();

// router.use(cors({
//     credentials: true,
// }))

// POST /auth/s_signup (학생 가입)
router.post('/auth/s_signup', isNotLoggedIn, s_signup);

// POST /auth/t_signup (교사 가입)
router.post('/auth/t_signup', isNotLoggedIn, t_signup);

// POST /auth/signin (로그인)
router.post('/auth/signin', isNotLoggedIn, signin);

// POST /auth/signout (로그아웃)
router.post('/auth/signout', isLoggedIn, signout);

router.get('/auth/checkLoginStatus', checkLoginStatus);

router.get('/profile', isLoggedIn, renderProfile);

router.get('/onboarding', isNotLoggedIn, renderOnboarding);

router.get('/teacherpage', (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return renderTeacherpage(req, res, next);
    } else {
        res.status(403).send('접근 권한이 없습니다');
    }
});

// Lesson
router.post('/lesson/create', isLoggedIn, isTeacher, createLesson);

router.get('/lesson/teacher=:teacher', isLoggedIn, readLessons);

router.get('/lesson/teacher=:teacher/:id', isLoggedIn, isTeacher, readLesson);

router.put('/lesson/teacher=:teacher/update/:id', isLoggedIn, isTeacher, updateLesson);

// Performance
router.post('/performance/create',/*  isLoggedIn, isTeacher, */ createPerformance);

router.get('/performance/lesson=:lesson', isLoggedIn, readPerformances);

router.get('/performance/lesson=:lesson/:id', isLoggedIn, readPerformance);

router.put('/performance/lesson=:lesson/update/:id', isLoggedIn, isTeacher, updatePerformance);


// Evaluation
router.post('/evaluation/create', isLoggedIn, isTeacher, createEvaluation);

router.get('/evaluation/performance=:performance/s_classof=:s_classof', isLoggedIn, isTeacher, readAllEvaluationsForTeacher);

router.get('/evaluation/s_classof=:s_classof/', isLoggedIn, isStudent, readAllEvaluationsForStudent);

router.put('/evaluation/teacher/performance=:performance/s_classof=:s_classof/', isLoggedIn, isTeacher, updateEvaluationScore);

router.put('/evaluation/student/performance=:performance', isLoggedIn, isStudent, updateEvaluationCheck);

// Main
router.get('/students', renderStudentsMain);

router.get('/teachers', renderTeachersMain);

module.exports = router;