const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Students = require('../models/students');
const Teacher = require('../models/teachers');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: false,
    }, async (id, password, done) => {
        try {
            let user = await Students.findOne({ where: { s_id: id } });

            if (!user) {
                user = await Teacher.findOne({ where: { t_id: id } });
            }

            if (user) {
                const passwordField = user.s_pass ? user.s_pass : user.t_pass;
                const result = await bcrypt.compare(password, passwordField);
                if (result) {
                    done(null, user);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
