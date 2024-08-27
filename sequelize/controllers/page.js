exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - C!ick' });
};

exports.renderSignup = (req, res) => {
    res.render('signup', { title: '회원 가입 - C!ick' });
};

exports.renderSignin = (req, res) => {
    res.render('signin', { title: '로그인 - C!ick' });
};

exports.renderAlarm = (req, res) => {
    res.render('alarm', { title: '알림 - C!ick' });
};

exports.renderTeacherpage = (req, res) => {
    res.render('teacherpage', { title: '선생님 페이지 - C!ick' });
};

exports.renderTeacherResults = (req, res) => {
    res.render('teacherResults', { title: '선생님 결과 - C!ick' });
};

exports.renderStudentResults = (req, res) => {
    res.render('studentResults', { title: '학생 결과 - C!ick' });
};

exports.renderMain = (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'C!ick',
        twits,
    });
};
