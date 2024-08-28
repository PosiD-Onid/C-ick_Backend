const passport = require('passport');
const local = require('./localStrategy');
const Students = require('../models/students');
const Teacher = require('../models/teachers');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, role: user.role });
    });

    passport.deserializeUser(async (obj, done) => {
        try {
            let user = null;
            if (obj.role === 'student') {
                user = await Students.findOne({ where: { id: obj.id } });
            } else if (obj.role === 'teacher') {
                user = await Teacher.findOne({ where: { id: obj.id } });
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    local();
};
