const { DataTypes, Model } = require('sequelize');

module.exports = class Assessment extends Model {
    static init(sequelize) {
        return super.init({
            assessmentId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                comment: "수행평가 ID"
            },
            subjectTitle: {
                type: DataTypes.STRING(20),
                allowNull: false,
                comment: "수행평가 제목"
            },
            subjectContents: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "수행평가 내용"
            },
            subjectStartDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "수행평가 시작 날짜/시/분"
            },
            subjectEndDate: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: "수행평가 끝 날짜/시/분"
            },
            subjectMethod: {
                type: DataTypes.STRING(10),
                allowNull: true,
                comment: "수행평가 제출 경로"
            }
        }, {
            modelName: 'Assessment',
            tableName: 'Assessments',
            timestamps: true,
            sequelize,
        });
    }

    static associate(db) {
        db.Assessment.belongsToMany(db.Subject, {
            through: 'SubjectAssessment',
            as: 'subjects',
            foreignKey: 'assessmentId',
            otherKey: 'subjectId'
        });
    }
};
