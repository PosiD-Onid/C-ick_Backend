const bcrypt = require('bcrypt');
const passport = require('passport');
const Students = require('../models/students');
const Teachers = require('../models/teachers');

exports.s_signup = async (req, res, next) => {
    const { s_id, s_name, s_pass } = req.body;
    try {
        const exStudents = await Students.findOne({ where: { s_id } });
        if (exStudents) {
            return res.redirect('/signup?error=exist');
        }
        const hash = await bcrypt.hash(s_pass, 8);
        await Students.create({
            s_id,
            s_name,
            s_pass: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.t_signup = async (req, res, next) => {
    const { t_id, t_name, t_subject, t_pass } = req.body;
    try {
        const exTeachers = await Teachers.findOne({ where: { t_id } });
        if (exTeachers) {
            return res.redirect('/signup?error=exist');
        }
        const hash = await bcrypt.hash(t_pass, 8);
        await Teachers.create({
            t_id,
            t_name,
            t_subject,
            t_pass: hash,
        });
        return res.redirect('/');
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
            return res.redirect(`/?error=${info.message}`);
        }
        return req.logIn(user, (signinError) => {
            if (signinError) {
                console.error(signinError);
                return next(signinError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};


exports.signout = (req, res) => {
    req.signout(() => {
        res.redirect('/');
    });
};