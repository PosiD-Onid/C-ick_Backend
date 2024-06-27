const { DataTypes, Model } = require('sequelize');

class Student extends Model {
    static init(sequelize) {
        return super.init({
            userid: {
                type: DataTypes.STRING(15),
                allowNull: false,
                unique: true,
                primaryKey: true,
                comment: '사용자 ID',
            },
            password: {
                type: DataTypes.STRING(20),
                allowNull: false,
                comment: '비밀번호',
            },
            name: {
                type: DataTypes.STRING(5),
                allowNull: false,
                comment: '이름',
            },
            grade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '학년',
            },
            classNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '반',
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '번호',
            },
            phoneNumber: {
                type: DataTypes.STRING(11),
                allowNull: false,
                comment: '전화번호',
            },
        }, {
            modelName: 'Student',
            tableName: 'Students',
            timestamps: true,
            sequelize,
        });
    }

    static associate(db) {
        db.Student.belongsToMany(db.Lesson, {
            through: 'StudentLesson',
            as: 'classes',
            foreignKey: 'userid',
            otherKey: 'lessonId',
        });
    }
}

module.exports = Student;
