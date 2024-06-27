const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Teacher } = require('../../models'); // 모델 경로 확인 필요

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: true, // 올바른 옵션명 사용
    }, async (req, id, password, done) => {
        try {
            const exUser = await Teacher.findOne({ where: { id: id } });
            if (!exUser) {
                return done(null, false, { message: '존재하지 않는 선생님 아이디 입니다.' });
            }
            const isMatch = await bcrypt.compare(password, exUser.password);
            if (isMatch) {
                return done(null, exUser);
            } else {
                return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
            }
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};
