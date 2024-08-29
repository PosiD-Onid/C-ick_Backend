const db = require('../models');

exports.createLesson = async (req, res, next) => {
    try {
        const {
            l_title,
            l_content,
            l_year,
            l_semester,
            l_grade,
            l_class,
            l_place
        } = req.body;
        
        const t_id = '1';

        const lesson = await db.Lesson.create({
            l_title,
            l_content,
            l_year,
            l_semester,
            l_grade,
            l_class,
            l_place,
            t_id,
        });

        res.status(201).json({ lesson });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.readLessons = async (req, res, next) => {
    try {
        const lessons = await db.Lesson.findAll();
        res.status(200).json(lessons);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.readLesson = async (req, res, next) => {
    const { id } = req.params;
    try {
        const lesson = await db.Lesson.findOne({ where: { l_id: id } });
        if (!lesson) {
            return res.status(404).json({ message: '수업을 찾을 수 없습니다.' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.updateLesson = async (req, res, next) => {
    const { id } = req.params;
    const { l_title, l_content, l_year, l_semester, l_grade, l_class, l_place } = req.body;
    // const { t_id } = req.user;
    const t_id = '1';

    try {
        const lesson = await db.Lesson.findOne({ where: { l_id: id } });

        if (!lesson) {
            return res.status(404).json({ message: '수업을 찾을 수 없습니다.' });
        }

        if (lesson.t_id !== t_id) {
            return res.status(403).json({ message: '이 수업을 수정할 권한이 없습니다.' });
        }

        await db.Lesson.update(
            {
                l_title,
                l_content,
                l_year,
                l_semester,
                l_grade,
                l_class,
                l_place,
            },
            { where: { l_id: id } }
        );

        res.status(200).json({ message: '수업이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.createPerformance = async (req, res, next) => {
    const {
        p_title,
        p_type,
        p_content,
        p_criteria,
        p_startdate,
        p_enddate,
        l_id
    } = req.body;
    // const { t_id } = req.user;
    const t_id = "1";

    try {
        const lesson = await db.Lesson.findOne({ where: { l_id, t_id } });

        if (!lesson) {
            return res.status(403).json({ message: '수업이 존재하지 않거나 권한이 없습니다.' });
        }
    
        const performance = await db.Performance.create({
            p_title,
            p_type,
            p_content,
            p_criteria,
            p_startdate,
            p_enddate,
            l_id,
        });

        res.status(201).json({ message: '수행평가가 성공적으로 생성되었습니다.', performance });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getPerformances = async (req, res, next) => {
    try {
        const performances = await db.Performance.findAll({
            include: [{ model: db.Lesson, attributes: ['l_title'] }],
        });

        res.status(200).json(performances);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getPerformance = async (req, res, next) => {
    const { id } = req.params;

    try {
        const performance = await db.Performance.findOne({
            where: { p_id: id },
            include: [{ model: db.Lesson, attributes: ['l_title'] }],
        });

        if (!performance) {
            return res.status(404).json({ message: '수행평가를 찾을 수 없습니다.' });
        }

        res.status(200).json(performance);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.updatePerformance = async (req, res, next) => {
    const { id } = req.params;
    const { p_title, p_type, p_content, p_criteria, p_startdate, p_enddate } = req.body;
    // const { t_id } = req.user;
    const t_id = "1";

    try {
        const performance = await db.Performance.findOne({
            where: { p_id: id },
            include: [{ model: db.Lesson }],
        });

        if (!performance) {
            return res.status(404).json({ message: '수행평가를 찾을 수 없습니다.' });
        }

        if (performance.Lesson.t_id !== t_id) {
            return res.status(403).json({ message: '이 수행평가를 수정할 권한이 없습니다.' });
        }

        await performance.update({
            p_title,
            p_type,
            p_content,
            p_criteria,
            p_startdate,
            p_enddate,
        });

        res.status(200).json({ message: '수행평가가 성공적으로 업데이트되었습니다.', performance });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderProfile = (req, res) => {
    res.render('profile');
};

exports.renderSignup = (req, res) => {
    res.render('signup');
};

exports.renderSignin = (req, res) => {
    res.render('signin');
};

exports.renderTeacherpage = (req, res) => {
    res.render('teacherpage');
};

exports.renderTeacherResults = (req, res) => {
    res.render('teacherResults');
};

exports.renderStudentResults = (req, res) => {
    res.render('studentResults');
};

exports.renderMain = (req, res, next) => {
    const twits = [];
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>C!ick</title>
        </head>
        <body>
            <h1>Welcome to C!ick</h1>
            <p>This is the main page.</p>
            <ul>
                ${twits.map(twit => `<li>${twit}</li>`).join('')}
            </ul>
        </body>
        </html>
    `);
};
