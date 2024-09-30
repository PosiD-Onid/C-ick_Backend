// const bcrypt = require('bcrypt');
const passport = require('passport');
const Students = require('../models/students');
const Teachers = require('../models/teachers');
const { isNotLoggedIn } = require('../middlewares');

exports.s_signup = async (req, res, next) => {
    console.log(req.body)
    const { s_id, s_name, s_pass } = req.body;
    try {
        if (s_pass.length < 8) {
            return res.status(400).send('비밀번호는 최소 8자 이상이어야 합니다.');
        }
        const exStudents = await Students.findOne({ where: { s_id } });
        const exTeacher = await Teachers.findOne({ where: { t_id: s_id } });
        if (exStudents || exTeacher) {
            return res.status(400).send('이미 존재하는 아이디입니다.');
        }
        //const hash = await bcrypt.hash(s_pass, 8);
        await Students.create({
            s_id,
            s_name,
            s_pass//: hash,
        });
        return res.status(200).send('회원가입 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.t_signup = async (req, res, next) => {
    console.log(req.body)
    const { t_id, t_name, t_subject, t_pass } = req.body;
    try {
        if (t_pass.length < 8) {
            return res.status(400).send('비밀번호는 최소 8자 이상이어야 합니다.');
        }
        const exTeachers = await Teachers.findOne({ where: { t_id } });
        const exStudent = await Students.findOne({ where: { s_id: t_id } });
        if (exTeachers || exStudent) {
            return res.status(400).send('이미 존재하는 아이디입니다.');
        }
        //const hash = await bcrypt.hash(t_pass, 8);
        await Teachers.create({
            t_id,
            t_name,
            t_subject,
            t_pass//: hash,
        });
        return res.status(200).send('회원가입 성공')
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.signin = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        return req.logIn(user, (signinError) => {
            if (signinError) {
                console.error(signinError);
                return next(signinError);
            }

            req.session.userId = user.s_id ? user.s_id : user.t_id;
            req.session.userRole = user.s_id ? 'student' : 'teacher';

            const userType = req.session.userRole;
            const userId = req.session.userId;

            console.log("세션 정보:", req.session);

            return res.status(200).json({ userType, userId });
    });
  })(req, res, next);
};

exports.checkLoginStatus = (req, res) => {
    if (req.isAuthenticated()) {  // passport.js에서 제공하는 함수로, 사용자가 로그인 되어 있는지 확인
        return res.status(200).json({ isLoggedIn: true });
    } else {
        return res.status(200).json({ isLoggedIn: false });
    }
};


exports.signout = (req, res) => {
    req.logout(() => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('로그아웃 실패');
            }
            res.status(200).send('로그아웃 성공');
        });
    });
};
