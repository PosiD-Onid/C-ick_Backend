const { DataTypes, Model } = require('sequelize');

class Subject extends Model {
    static init(sequelize) {
        return super.init({
            subjectId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                comment: "과목 ID"
            },
            subjectName: {
                type: DataTypes.STRING(10),
                allowNull: false,
                comment: "과목 이름"
            }
        }, {
            modelName: 'Subject',
            tableName: 'Subjects',
            timestamps: true,
            sequelize,
        });
    }

    static associate(db) {
        db.Subject.belongsToMany(db.Lesson, {
            through: 'SubjectLesson',
            as: 'classes',
            foreignKey: 'subjectId',
            otherKey: 'lessonId'
        });
        db.Subject.belongsToMany(db.Teacher, {
            through: 'TeacherSubject',
            as: 'teachers',
            foreignKey: 'subjectId',
            otherKey: 'userid'
        });
        db.Subject.belongsToMany(db.Assessment, {
            through: 'SubjectAssessment',
            as: 'assessments',
            foreignKey: 'subjectId',
            otherKey: 'assessmentId'
        });
    }
}

module.exports = Subject;
