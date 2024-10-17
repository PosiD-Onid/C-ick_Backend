const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn, isTeacher, isStudent } = require('../middlewares');
const { s_signup, t_signup, signin, checkLoginStatus, signout } = require('../controllers/auth');
const {
    renderProfile,
    renderPasswordChange,
    renderStudentsMain,
    renderTeachersMain,
    renderOnboarding,
    createLesson,
    readLessons,
    readLessonsData,
    readLesson,
    readLessonData,
    updateLesson,
    createPerformance,
    readPerformances,
    WebreadPerformances,
    readPerformancesData,
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

/**
 * @swagger
 * tags:
 *   name: Sign
 *   description: 학생 / 선생님 회원가입  로그인  로그아웃
 */

/**
 * @swagger
 * /auth/s_signup:
 *   post:
 *     summary: "학생 회원가입"
 *     description: "POST 방식으로 학생을 등록한다."
 *     tags: [Sign]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: "학생 아이디"
 *               name:
 *                 type: string
 *                 description: "학생 이름"
 *               password:
 *                 type: string
 *                 description: "학생 패스워드"
 *     responses:
 *       200:
 *         description: "회원가입 성공"
 *       403:
 *         description: "이미 존재하는 아이디입니다."
 */

router.post('/auth/s_signup', isNotLoggedIn, s_signup);

/**
 * @swagger
 * /auth/t_signup:
 *   post:
 *     summary: "선생님 회원가입"
 *     description: "POST 방식으로 선생님을 등록한다."
 *     tags: [Sign]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: "선생님 아이디"
 *               name:
 *                 type: string
 *                 description: "선생님 성함"
 *               subject:
 *                 type: string
 *                 description: "선생님 과목"
 *               password:
 *                 type: string
 *                 description: "선생님 패스워드"
 *     responses:
 *       200:
 *         description: "회원가입 성공"
 *       403:
 *         description: "이미 존재하는 아이디입니다."
 */
router.post('/auth/t_signup', isNotLoggedIn, t_signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: "로그인"
 *     description: "POST 방식으로 로그인한다."
 *     tags: [Sign]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: "아이디"
 *               password:
 *                 type: string
 *                 description: "패스워드"
 *     responses:
 *       200:
 *         description: "{ \"userType\": \"student / teacher\", \"userId\": \"로그인한 아이디\" }"
 *       403:
 *         description: "이미 존재하는 아이디입니다."
 */
router.post('/auth/signin', isNotLoggedIn, signin);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: "로그아웃"
 *     description: "POST 방식으로 로그아웃한다."
 *     tags: [Sign]
 *     responses:
 *       200:
 *         description: "로그아웃 성공"
 *       403:
 *         description: "로그인 필요"
 */
router.post('/auth/signout', isLoggedIn, signout);


router.get('/auth/checkLoginStatus', checkLoginStatus);

router.get('/profile', isLoggedIn, renderProfile);

router.put('/profile/passwordchange', isLoggedIn, renderPasswordChange)

router.get('/onboarding', isNotLoggedIn, renderOnboarding);

/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: 수업 생성 조회(전체) 조회 수정
 */

/**
 * @swagger
 * /lesson/create:
 *   post:
 *     summary: "수업 생성"
 *     description: "수업 생성에 필요한 내용을 담아 서버에 보낸다."
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               l_title:
 *                 type: string
 *                 description: "수업 제목"
 *               l_content:
 *                 type: string
 *                 description: "수업 내용"
 *               l_year:
 *                 type: string
 *                 description: "수업 연도"
 *               l_semester:
 *                 type: string
 *                 description: "수업 학기"
 *               l_grade:
 *                 type: string
 *                 description: "수업 학년"
 *               l_class:
 *                 type: string
 *                 description: "수업 반"
 *               l_place:
 *                 type: string
 *                 description: "수업 장소"
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     l_id:
 *                       type: integer
 *                       description: "수업 ID"
 *                     l_title:
 *                       type: string
 *                       description: "수업 제목"
 *                     l_content:
 *                       type: string
 *                       description: "수업 내용"
 *                     l_year:
 *                       type: string
 *                       description: "수업 연도"
 *                     l_semester:
 *                       type: string
 *                       description: "수업 학기"
 *                     l_grade:
 *                       type: string
 *                       description: "수업 학년"
 *                     l_class:
 *                       type: string
 *                       description: "수업 반"
 *                     l_place:
 *                       type: string
 *                       description: "수업 장소"
 *                     t_id:
 *                       type: string
 *                       description: "선생님 ID"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: "수정된 날짜"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: "생성된 날짜"
 *       "400":
 *         description: "로그인 필요"
 */
router.post('/lesson/create', isLoggedIn, isTeacher, createLesson);

/**
 * @swagger
 * /lesson/teacher={teacher}:
 *   get:
 *     summary: "선생님 수업 조회"
 *     description: "특정 선생님의 수업 목록을 조회한다."
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: teacher
 *         schema:
 *           type: string
 *         required: true
 *         description: "선생님 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   l_id:
 *                     type: integer
 *                     description: "수업 ID"
 *                   l_title:
 *                     type: string
 *                     description: "수업 제목"
 *                   l_content:
 *                     type: string
 *                     description: "수업 내용"
 *                   l_year:
 *                     type: string
 *                     description: "수업 연도"
 *                   l_semester:
 *                     type: string
 *                     description: "수업 학기"
 *                   l_grade:
 *                     type: string
 *                     description: "수업 학년"
 *                   l_class:
 *                     type: string
 *                     description: "수업 반"
 *                   l_place:
 *                     type: string
 *                     description: "수업 장소"
 *                   t_id:
 *                     type: string
 *                     description: "선생님 ID"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "생성된 날짜"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "수정된 날짜"
 *       403:
 *         description: "로그인 필요"
 */
router.get('/lesson/teacher=:teacher', isLoggedIn, readLessons);

router.get('/lesson/classof', isLoggedIn, readLessonsData);

/**
 * @swagger
 * /lesson/teacher={teacher}/{id}:
 *   get:
 *     summary: "수업 상세 조회"
 *     description: "특정 수업의 상세 정보를 조회한다."
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: teacher
 *         schema:
 *           type: string
 *         required: true
 *         description: "선생님 ID"
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "수업 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   l_id:
 *                     type: integer
 *                     description: "수업 ID"
 *                   l_title:
 *                     type: string
 *                     description: "수업 제목"
 *                   l_content:
 *                     type: string
 *                     description: "수업 내용"
 *                   l_year:
 *                     type: string
 *                     description: "수업 연도"
 *                   l_semester:
 *                     type: string
 *                     description: "수업 학기"
 *                   l_grade:
 *                     type: string
 *                     description: "수업 학년"
 *                   l_class:
 *                     type: string
 *                     description: "수업 반"
 *                   l_place:
 *                     type: string
 *                     description: "수업 장소"
 *                   t_id:
 *                     type: string
 *                     description: "선생님 ID"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "생성된 날짜"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "수정된 날짜"
 *       403:
 *         description: "로그인 필요"
 */
router.get('/lesson/teacher=:teacher/:id', isLoggedIn, isTeacher, readLesson);

router.get('/lesson/classof/:id', isLoggedIn, readLessonData)

/**
 * @swagger
 * /lesson/teacher={teacher}/update/{id}:
 *   put:
 *     summary: "선생님 수업 수정"
 *     description: "특정 선생님의 수업 정보를 수정한다."
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: teacher
 *         schema:
 *           type: string
 *         required: true
 *         description: "선생님 ID"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "수업 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수업이 성공적으로 업데이트되었습니다."
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수업을 찾을 수 없습니다."
 *       403:
 *         description: "로그인 필요"
 */
router.put('/lesson/teacher=:teacher/update/:id', isLoggedIn, isTeacher, updateLesson);

/**
 * @swagger
 * tags:
 *   name: Performance
 *   description: 수행평가 생성 조회(전체) 조회 수정
 */

/**
 * @swagger
 * /performance/create:
 *   post:
 *     summary: "수행평가 생성"
 *     description: "새로운 수행평가를 생성한다."
 *     tags: [Performance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p_title:
 *                 type: string
 *                 description: "수행평가 제목"
 *               p_place:
 *                 type: string
 *                 description: "수행평가 장소"
 *               p_content:
 *                 type: string
 *                 description: "수행평가 내용"
 *               p_startdate:
 *                 type: string
 *                 format: date-time
 *                 description: "수행평가 시작 날짜"
 *               p_enddate:
 *                 type: string
 *                 format: date-time
 *                 description: "수행평가 종료 날짜"
 *               l_id:
 *                 type: integer
 *                 description: "연결된 수업 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가가 성공적으로 생성되었습니다."
 *       404:
 *         description: "수업이 존재하지 않거나 권한이 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수업이 존재하지 않거나 권한이 없습니다."
 *       403:
 *         description: "로그인 필요"
 */

router.post('/performance/create',/*  isLoggedIn, isTeacher, */ createPerformance);

/**
 * @swagger
 * /performance/lesson={lesson}:
 *   get:
 *     summary: "수행평가 전체 조회"
 *     description: "모든 수행평가 목록을 조회한다."
 *     tags: [Performance]
 *     parameters:
 *       - in: path
 *         name: lesson
 *         schema:
 *           type: string
 *         required: true
 *         description: "수업 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   p_id:
 *                     type: integer
 *                     description: "수행평가 ID"
 *                   p_title:
 *                     type: string
 *                     description: "수행평가 제목"
 *                   p_place:
 *                     type: string
 *                     description: "수행평가 장소"
 *                   p_content:
 *                     type: string
 *                     description: "수행평가 내용"
 *                   p_startdate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 시작 날짜"
 *                   p_enddate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 종료 날짜"
 *                   l_id:
 *                     type: integer
 *                     description: "연결된 수업 ID"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "생성 날짜"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "업데이트 날짜"
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description: "삭제 날짜"
 *       403:
 *         description: "로그인 필요"
 */
router.get('/performance/lesson=:lesson', isLoggedIn, readPerformances);

/**
 * @swagger
 * /performance/teacher={teacher}:
 *   get:
 *     summary: "수행평가 전체 조회 (Web)"
 *     description: "모든 수행평가 목록을 조회한다."
 *     tags: [Performance]
 *     parameters:
 *       - in: path
 *         name: teacher
 *         schema:
 *           type: string
 *         required: true
 *         description: "선생님 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   p_id:
 *                     type: integer
 *                     description: "수행평가 ID"
 *                   p_title:
 *                     type: string
 *                     description: "수행평가 제목"
 *                   p_place:
 *                     type: string
 *                     description: "수행평가 장소"
 *                   p_content:
 *                     type: string
 *                     description: "수행평가 내용"
 *                   p_startdate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 시작 날짜"
 *                   p_enddate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 종료 날짜"
 *                   l_id:
 *                     type: integer
 *                     description: "연결된 수업 ID"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "생성 날짜"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "업데이트 날짜"
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description: "삭제 날짜"
 *       403:
 *         description: "로그인 필요"
 */
router.get('/performance/teacher', isLoggedIn, WebreadPerformances);

router.get('/performance/classof', isLoggedIn, readPerformancesData);

/**
 * @swagger
 * /performance/lesson={lesson}/{id}:
 *   get:
 *     summary: "수행평가 상세 조회"
 *     description: "특정 수행평가의 상세 정보를 조회한다.."
 *     tags: [Performance]
 *     parameters:
 *       - in: path
 *         name: lesson
 *         schema:
 *           type: string
 *         required: true
 *         description: "수업 ID"
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "수행평가 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   p_id:
 *                     type: integer
 *                     description: "수행평가 ID"
 *                   p_title:
 *                     type: string
 *                     description: "수행평가 제목"
 *                   p_place:
 *                     type: string
 *                     description: "수행평가 장소"
 *                   p_content:
 *                     type: string
 *                     description: "수행평가 내용"
 *                   p_startdate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 시작 날짜"
 *                   p_enddate:
 *                     type: string
 *                     format: date-time
 *                     description: "수행평가 종료 날짜"
 *                   l_id:
 *                     type: integer
 *                     description: "연결된 수업 ID"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "생성 날짜"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "업데이트 날짜"
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description: "삭제 날짜"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가를 찾을 수 없습니다."
 *       403:
 *         description: "로그인 필요"
 */
router.get('/performance/lesson=:lesson/:id', isLoggedIn, readPerformance);

/**
 * @swagger
 * /performance/lesson={lesson}/update/{id}:
 *   put:
 *     summary: "수행평가 수정"
 *     description: "특정 수행평가의 정보를 수정한다."
 *     tags: [Performance]
 *     parameters:
 *       - in: path
 *         name: lesson
 *         schema:
 *           type: string
 *         required: true
 *         description: "수업 ID"
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "수행평가 ID"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가가 성공적으로 업데이트되었습니다."
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가를 찾을 수 없습니다."
 *       402:
 *         description: "사실 404"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "관련된 수업을 찾을 수 없습니다."
 *       405:
 *         description: "사실 404"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가 업데이트 실패 또는 데이터가 없습니다."
 *       403:
 *         description: "로그인 필요"
 */
router.put('/performance/lesson=:lesson/update/:id', isLoggedIn, isTeacher, updatePerformance);


/**
 * @swagger
 * tags:
 *   name: Evaluation
 *   description: 점수 생성 조회(전체) 조회 수정
 */

/**
 * @swagger
 * /Evaluation/create:
 *   post:
 *     summary: "점수 생성"
 *     description: "새로운 점수를 생성한다."
 *     tags: [Evaluation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               e_check:
 *                 type: boolean
 *                 description: "점수 체크 여부"
 *                 example: false
 *               s_classof:
 *                 type: integer
 *                 description: "학생의 반 정보"
 *                 example: 1100
 *               p_id:
 *                 type: integer
 *                 description: "수행평가 ID"
 *                 example: 2
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가점수가 성공적으로 생성되었습니다."
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "s_classof 값이 유효하지 않습니다."
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수행평가를 찾을 수 없습니다."
 *       402:
 *         description: "404"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "해당 학급에 속하는 학생이 없습니다."
 *       403:
 *         description: "로그인 필요"
 */
router.post('/evaluation/create', isLoggedIn, isTeacher, createEvaluation);

/**
 * @swagger
 * /evaluation/performance={performance}/s_classof={s_classof}:
 *   get:
 *     summary: "선생님 점수 조회"
 *     description: "특정 수행평가에 대한 학생들의 평가 목록을 조회한다."
 *     tags: [Evaluation]
 *     parameters:
 *       - in: path
 *         name: performance
 *         schema:
 *           type: string
 *         required: true
 *         description: "수행평가 ID"
 *       - in: path
 *         name: s_classof
 *         schema:
 *           type: integer
 *         required: true
 *         description: "학반번호"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   e_score:
 *                     type: integer
 *                     description: "학생 점수"
 *                   e_check:
 *                     type: boolean
 *                     description: "점수 체크 여부"
 *                   s_classof:
 *                     type: integer
 *                     description: "학생 반 정보"
 *                   s_name:
 *                     type: string
 *                     description: "학생 이름"
 *                   p_id:
 *                     type: integer
 *                     description: "수행평가 ID"
 *                   p_title:
 *                     type: string
 *                     description: "수행평가 제목"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "s_classof 값이 유효하지 않습니다."
 *       403:
 *         description: "로그인 필요"
 */
router.get('/evaluation/performance=:performance/s_classof=:s_classof', isLoggedIn, isTeacher, readAllEvaluationsForTeacher);

router.get('/evaluation/s_classof=:s_classof/', isLoggedIn, isStudent, readAllEvaluationsForStudent);

router.put('/evaluation/teacher/performance=:performance/s_classof=:s_classof/', isLoggedIn, isTeacher, updateEvaluationScore);

router.put('/evaluation/student/performance=:performance', isLoggedIn, isStudent, updateEvaluationCheck);

// Main
router.get('/students', renderStudentsMain);

router.get('/teachers', renderTeachersMain);

module.exports = router;