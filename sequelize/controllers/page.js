const Sequelize = require('sequelize');
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
        const { t_id } = req.user;
        // const t_id = 'qwe';

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
    // console.log(req.body);
    const { teacher } = req.params;
    // const teacher = 'qwe';
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
    const { t_id } = req.user;
    // const t_id = 'qwe';

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
    const { l_id } = req.params;
    console.log(req.body);
    
    const {
        p_title,
        // p_type,
        p_place,
        p_content,
        // p_criteria,
        p_startdate,
        p_enddate,
    } = req.body.params;
    const { t_id } = req.user;
    // const t_id = 'qwe';
    // const l_id = 3

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
    console.log(req.body);
    const { lesson } = req.params;
    // const lesson = 3;
    try {
        const performances = await db.Performance.findAll({
            where: { l_id: lesson },
            order: [['p_startdate', 'DESC']]
        });
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
    // console.log(req.body);
    const { id } = req.params;
    const {
        p_title,
        p_type,
        p_content,
        p_criteria,
        p_startdate,
        p_enddate,
        p_id,
    } = req.body;
    // const { t_id } = req.user;
    const t_id = 'www';

    try {
        const performance = await db.Performance.findOne({ where: { p_id: p_id } });

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

        // 여기서 출력이 안됨
        console.log(req.body)
        const result = await db.Performance.update(
            {
                p_title,
                p_type,
                p_content,
                p_criteria,
                p_startdate,
                p_enddate,
            },
            {
                where: { p_id },
            }
        );

         if (result[0] === 0) {
            return res.status(404).json({ message: '수행평가 업데이트 실패 또는 데이터가 없습니다.' });
        }

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
            s_classof,
            p_id
        } = req.body;

        try {
            const classofNumber = parseInt(s_classof, 10); 

            if (isNaN(classofNumber)) {
                return res.status(400).json({ message: 's_classof 값이 유효하지 않습니다.' });
            }
    
            // p_id로 수행평가를 찾음
            const performance = await db.Performance.findOne({ where: { p_id } });
    
            if (!performance) {
                return res.status(404).json({ message: '수행평가를 찾을 수 없습니다.' });
            }
    
            // 앞 두 자리 확인을 위해 classofNumber를 문자열로 변환
            const classGroupPrefix = classofNumber.toString().slice(0, 2);
    
            // 해당하는 학급의 학생들 조회
            const students = await db.Students.findAll({
                where: {
                    s_classof: {
                        [Sequelize.Op.like]: `${classGroupPrefix}%`
                    }
                }
            });
    
            if (students.length === 0) {
                return res.status(404).json({ message: '해당 학급에 속하는 학생이 없습니다.' });
            }
    
            // 해당 학생들에 대해 평가 생성
            const evaluation = await Promise.all(
                students.map(student =>
                    db.Evaluation.create({
                        e_score,
                        e_check,
                        s_classof: student.s_classof,
                        s_name: student.s_name, // 학생의 s_name 추가
                        p_id,
                        p_title: performance.p_title // 수행평가의 p_title 추가
                    })
                )
            );
    

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
    const { performance, s_classof } = req.params;

    try {
        const classofNumber = parseInt(s_classof, 10); 

        if (isNaN(classofNumber)) {
            return res.status(400).json({ message: 's_classof 값이 유효하지 않습니다.' });
        }

        // s_classof의 앞부분이 특정 숫자인 학생들의 평가를 조회
        const classGroupPrefix = classofNumber.toString().slice(0, 2); // 앞 두 자리 가져오기

        const evaluations = await db.Evaluation.findAll({
            where: {
                s_classof: {
                    [Sequelize.Op.like]: `${classGroupPrefix}%` // 앞 두 자리로 필터링
                },
                p_id: performance
            },
            // include: [{ model: db.Student, attributes: ['s_name'] }] // 학생 이름을 포함
        });

        res.status(200).json(evaluations);
    } catch (error) {
        console.error(error);
        next(error);
    }
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
        const { e_check } = req.body;

        try {
            const evaluation = await db.Evaluation.findOne({ where: { e_id } });

            if (!evaluation) {
                return res.status(404).json({ message: '수행평가점수를 찾을 수 없습니다.' });
            }

            await evaluation.update({ e_check });

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