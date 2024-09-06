const bcrypt = require('bcrypt');
const passport = require('passport');
const Students = require('../models/students');
const Teachers = require('../models/teachers');

exports.s_signup = async (req, res, next) => {
    const { s_id, s_name, s_pass } = req.body;
    try {
        if (s_pass.length < 8) {
            return res.status(400).send('비밀번호는 최소 8자 이상이어야 합니다.');
        }
        const exStudents = await Students.findOne({ where: { s_id } });
        if (exStudents) {
            return res.status(400).send('이미 존재하는 아이디입니다.');
        }
        const hash = await bcrypt.hash(s_pass, 8);
        await Students.create({
            s_id,
            s_name,
            s_pass: hash,
        });
        return res.status(200).send('회원가입 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.t_signup = async (req, res, next) => {
    const { t_id, t_name, t_subject, t_pass } = req.body;
    try {
        if (t_pass.length < 8) {
            return res.status(400).send('비밀번호는 최소 8자 이상이어야 합니다.');
        }
        const exTeachers = await Teachers.findOne({ where: { t_id } });
        if (exTeachers) {
            return res.status(400).send('이미 존재하는 아이디입니다.');
        }
        const hash = await bcrypt.hash(t_pass, 8);
        await Teachers.create({
            t_id,
            t_name,
            t_subject,
            t_pass: hash,
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
            return res.status(401).send(info.message);
        }
        return req.logIn(user, (signinError) => {
            if (signinError) {
                console.error(signinError);
                return next(signinError);
            }

            const userType = user.s_id ? 'student' : 'teacher';

            if (userType === 'student') {
                return res.status(200).send('사용자 유형: student');
            } else if (userType === 'teacher') {
                return res.status(200).send('사용자 유형: teacher');
            } else {
                return res.status(400).send('가입되지 않은 사용자입니다.');
            }
        });
    })(req, res, next);
};

exports.signout = (req, res) => {
    req.logout(() => {
        res.status(200).send('로그아웃 성공')
    });
};
