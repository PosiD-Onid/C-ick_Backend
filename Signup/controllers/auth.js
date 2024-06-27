const passport = require("passport");
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.log(err);
            return next(err);
        }

        if(!user) {
            return res.redirect(`/loginError=${info.message}`);
        }

        return req.login((user, err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);

}