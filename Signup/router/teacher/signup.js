const bcrypt = require('bcrypt');
const { Teacher } = require('../../models');

const signup = async (req, res) => {
    const { id, password, name, phoneNumber } = req.body;
    const salt = await bcrypt.genSalt(10);
    try {
        const hashedPwd = await bcrypt.hash(password, salt);
        await Teacher.create({
            id,
            password: hashedPwd,
            name,
            phoneNumber,
        });
        return res.status(201).json({
            status: 201,
            message: '선생님 회원가입에 성공하였습니다.',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 200,
            message: 'server error',
        });
    }
};

module.exports = signup;
