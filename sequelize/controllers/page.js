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
        
        const t_id = 'qwe';

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
    const { teacher } = req.params;
    try {
        const lessons = await db.Lesson.findAll({ where: { t_id: teacher } });
        res.status(200).json(lessons);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.readLesson = async (req, res, next) => {
    const { teacher, id } = req.params;
    try {
        const lesson = await db.Lesson.findOne({ where: { t_id: teacher, l_id: id } });
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
    const {
        l_title,
        l_content,
        l_year,
        l_semester,
        l_grade,
        l_class,
        l_place
    } = req.body;
    // const { t_id } = req.user;
    const t_id = 'qwe';

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
    //console.log(req.body);
    
    const {
        p_title,
        // p_type,
        p_place,
        p_content,
        // p_criteria,
        p_startdate,
        p_enddate,
    } = req.body.params;
    // const { t_id } = req.user;
    const t_id = 'qwe';
    const l_id = 3

    //console.log(p_title)

    try {
        const lesson = await db.Lesson.findOne({ where: { l_id, t_id } });
        console.log(lesson)
        if (!lesson) {
            return res.status(403).json({ message: '수업이 존재하지 않거나 권한이 없습니다.' });
        }
    
        const performance = await db.Performance.create({
            p_title,
            // p_type,
            p_place,
            p_content,
            // p_criteria,
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

exports.readPerformances = async (req, res, next) => {
    const { lesson } = req.params;
    try {
        const performances = await db.Performance.findAll({ where: { l_id: lesson } });
        res.status(200).json(performances);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.readPerformance = async (req, res, next) => {
    const { lesson, id } = req.params;

    try {
        const performance = await db.Performance.findOne({
            where: { l_id: lesson, p_id: id },
            // include: [{ model: db.Lesson, attributes: ['l_title'] }],
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
    const {
        p_title,
        p_type,
        p_content,
        p_criteria,
        p_startdate,
        p_enddate
    } = req.body;
    // const { t_id } = req.user;
    const t_id = 'www';

    try {
        const performance = await db.Performance.findOne({ where: { p_id: id } });

        if (!performance) {
            return res.status(404).json({ message: '수행평가를 찾을 수 없습니다.' });
        }

        const lesson = await db.Lesson.findOne({ where: { l_id: performance.l_id } });

        if (!lesson) {
            return res.status(404).json({ message: '관련된 수업을 찾을 수 없습니다.' });
        }

        // if (lesson.t_id !== t_id) {
        //     return res.status(403).json({ message: '이 수행평가를 수정할 권한이 없습니다.' });
        // }
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

exports.createEvaluation = async (req, res, next) => {
    // if (req.user && req.user.role === 'teacher') {
        const {
            e_score,
            e_check,
            e_checkdate,
            s_classof,
            p_id
        } = req.body;

        try {
            const performance = await db.Performance.findOne({ where: { p_id } });

            if (!performance) {
                return res.status(404).json({ message: '수행평가를 찾을 수 없습니다.' });
            }

            const evaluation = await db.Evaluation.create({
                e_score,
                e_check,
                e_checkdate,
                s_classof,
                p_id,
            });

            res.status(201).json({ message: '수행평가점수가 성공적으로 생성되었습니다.', evaluation });
        } catch (error) {
            console.error(error);
            next(error);
        }
    // } else {
    //     res.status(403).send('평가를 생성할 권한이 없습니다.');
    // }
};

// 모든 Evaluation 조회 (선생님용)
exports.readAllEvaluationsForTeacher = async (req, res, next) => {
    // if (req.user && req.user.role === 'teacher') {
        const { p_id } = req.query;

        try {
            const where = p_id ? { p_id } : {};
            const evaluations = await db.Evaluation.findAll({
                where,
                // include: [
                //     { model: db.Student, attributes: ['s_name'] },
                //     { model: db.Performance, attributes: ['p_title'] },
                // ],
            });

            res.status(200).json(evaluations);
        } catch (error) {
            console.error(error);
            next(error);
        }
    // } else {
    //     res.status(403).send('접근 권한이 없습니다.');
    // }
};

// 학생의 모든 Evaluation 조회 (학생용)
exports.readAllEvaluationsForStudent = async (req, res, next) => {
    // if (req.user && req.user.role === 'student') {
        // const { s_classof } = req.user;
        const s_classof = '0000';

        try {
            const evaluations = await db.Evaluation.findAll({
                where: { s_classof },
                // include: [
                //     { model: db.Performance, attributes: ['p_title'] },
                // ],
            });

            res.status(200).json(evaluations);
        } catch (error) {
            console.error(error);
            next(error);
        }
    // } else {
    //     res.status(403).send('접근 권한이 없습니다.');
    // }
};

// Evaluation 업데이트 (선생님용: 점수 수정만 가능)
exports.updateEvaluationScore = async (req, res, next) => {
    // if (req.user && req.user.role === 'teacher') {
        const { e_id } = req.params;
        const { e_score } = req.body;


        try {
            const evaluation = await db.Evaluation.findOne({ where: { e_id } });

            if (!evaluation) {
                return res.status(404).json({ message: '수행평가점수를 찾을 수 없습니다.' });
            }

            await evaluation.update({ e_score });

            res.status(200).json({ message: '수행평가점수가 성공적으로 업데이트되었습니다.', evaluation });
        } catch (error) {
            console.error(error);
            next(error);
        }
    // } else {
    //     res.status(403).send('점수를 수정할 권한이 없습니다.');
    // }
};

// Evaluation 확인 상태 업데이트 (학생용: e_check만 수정 가능)
exports.updateEvaluationCheck = async (req, res, next) => {
    // if (req.user && req.user.role === 'student') {
        const { e_id } = req.params;
        const { e_check, e_checkdate } = req.body;

        try {
            const evaluation = await db.Evaluation.findOne({ where: { e_id } });

            if (!evaluation) {
                return res.status(404).json({ message: '수행평가점수를 찾을 수 없습니다.' });
            }

            await evaluation.update({ e_check, e_checkdate });

            res.status(200).json({ message: '수행평가점수 확인 상태가 성공적으로 업데이트되었습니다.', evaluation });
        } catch (error) {
            console.error(error);
            next(error);
        }
    // } else {
    //     res.status(403).send('수정할 권한이 없습니다.');
    // }
};

exports.renderProfile = (req, res) => {
    res.status(200).send("프로필");
};

exports.renderTeacherpage = (req, res) => {
    res.status(200).send("선생님 페이지");
};

exports.renderOnboarding = (req, res) => {
    res.status(200).send("onboarding(시작화면)");
}

exports.renderStudentsMain = (req, res) => {
    res.status(200).send("학생 메인페이지");
};

exports.renderTeachersMain = (req, res) => {
    res.status(200).send("선생님 메인페이지");
};