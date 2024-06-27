const { DataTypes, Model } = require('sequelize');

class Lesson extends Model {
    static init(sequelize) {
        return super.init({
            lessonId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                comment: "수업 ID"
            },
            lessonName: {
                type: DataTypes.STRING(10),
                allowNull: false,
                comment: "수업 이름"
            }
        }, {
            modelName: 'Lesson',
            tableName: 'Lessons',
            timestamps: true,
            sequelize,
        });
    }

    static associate(db) {
        db.Lesson.belongsToMany(db.Student, {
            through: 'StudentLesson',
            as: 'students',
            foreignKey: 'lessonId',
            otherKey: 'userid'
        });
    }
}

module.exports = Lesson;
