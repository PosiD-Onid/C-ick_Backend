const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn, isTeacher, isStudent, corsDomain } = require('../middlewares');
const { s_signup, t_signup, signin, signout } = require('../controllers/auth');
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
router.post('/lesson/create', /* isLoggedIn, isTeachers */ createLesson);

router.get('/lesson/read', /* isLoggedIn, */ readLessons);

router.get('/lesson/read/teacher=:teacher', /* isLoggedIn, isTeachers */ readLesson);

router.put('/lesson/update/:id', /* isLoggedIn, isTeachers */ updateLesson);

// Performance
router.post('/performance/create', /* isLoggedIn, isTachers */ createPerformance);

router.get('/performance/read', /* isLoggedIn, */ readPerformances);

router.get('/performance/read/:id', /* isLoggedIn, */ readPerformance);

router.put('/performance/update/:id', /* isLoggedIn, isTachers, */ updatePerformance);

// Evaluation
router.post('/evaluation/create', /* isLoggedIn, isTeacher, */ createEvaluation);

router.get('/evaluation/teacher/read', /* isLoggedIn, isTeacher, */ readAllEvaluationsForTeacher);

router.get('/evaluation/student/read', /* isLoggedIn, isStudent, */ readAllEvaluationsForStudent);

router.put('/evaluation/teacher/update/:e_id', /* isLoggedIn, isTeacher, */ updateEvaluationScore);

router.put('/evaluation/student/update/:e_id', /* isLoggedIn, isStudent, */ updateEvaluationCheck);

// Main
router.get('/students', renderStudentsMain);

router.get('/teachers', renderTeachersMain);

module.exports = router;