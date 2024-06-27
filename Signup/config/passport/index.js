const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/teacher');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where: {id: id}}, (err, user) => {})
            .then(user => done(null, user))
            .then(err => done(err));

    });

    local();
}