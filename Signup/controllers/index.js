const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/teacher');
const {development: user} = require("../config/config");

exports.join = async (req, res, next) => {
    try {
        const exUser = await User.findOne({where: {username: req.user.id}}, (err, user) => {
            return res.redirect('/join?error=exist');
        })

        const hash = await bcrypt.hash(req.body.password, user.password);
        await User.create({
            name,
            password: hash,
        });

        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return next(error);
    }
}