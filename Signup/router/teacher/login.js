const { Teacher } = require('../../models');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { teacherId, password } = req.body;

    try {
        const teacher = await Teacher.findOne({
            where: { id: teacherId },
        });
        if (!teacher) {
            return res.status(200).send({
                status: 400, 
                message: '존재하지 않는 선생님 아이디 입니다.',
            });
        }
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            return res.status(200).send({
                status: 400,
                message: '비밀번호가 맞지 않습니다.',
            });
        }

        const accessToken = 'accessToken';
        const refreshToken = 'refreshToken';

        return res.status(200).send({
            status: 200,
            message: '로그인에 성공하였습니다.',
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 200,
            message: 'server error',
        });
    }
};

module.exports = login;
