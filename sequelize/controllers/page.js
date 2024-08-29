const { Lesson } = require('../models/lesson');

// Lesson 생성 컨트롤러 함수
exports.createLesson = async (req, res, next) => {
  const {
    l_title,
    l_content,
    l_year,
    l_semester,
    l_grade,
    l_class,
    l_place,
  } = req.body;

  try {
    // 현재 로그인한 선생님의 ID 가져오기
    const t_id = req.user.t_id;

    // Lesson 생성
    const newLesson = await Lesson.create({
      l_title,
      l_content,
      l_year,
      l_semester,
      l_grade,
      l_class,
      l_place,
      t_id,
    });

    return res.status(201).json({ message: 'Lesson 생성완료', newLesson });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
