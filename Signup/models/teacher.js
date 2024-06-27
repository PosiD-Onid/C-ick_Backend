const { DataTypes, Model } = require('sequelize');

class Teacher extends Model {
    static init(sequelize) {
        return super.init({
            userid: {
                type: DataTypes.STRING(15),
                allowNull: false,
                unique: true,
                primaryKey: true,
                comment: '선생님 ID',
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '비밀번호',
            },
            name: {
                type: DataTypes.STRING(5),
                allowNull: false,
                comment: '이름',
            },
            phoneNumber: {
                type: DataTypes.STRING(11),
                allowNull: false,
                comment: '전화번호',
            },
        }, {
            modelName: 'Teacher',
            tableName: 'Teachers',
            timestamps: true,
            sequelize,
        });
    }

    static associate(db) {
        db.Teacher.belongsToMany(db.Subject, {
            through: 'TeacherSubject',
            as: 'subjects',
            foreignKey: 'userid',
            otherKey: 'subjectId',
        });
    }
}

module.exports = Teacher;
