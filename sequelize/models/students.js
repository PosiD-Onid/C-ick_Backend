const Sequelize = require('sequelize');

class Students extends Sequelize.Model {
    static initiate(sequelize) {
        Students.init({
            s_classof: {
                type: Sequelize.STRING(4),
                allowNull: false,
                unique: true,
                primaryKey: true,
                defaultValue: '0000'
            },
            s_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            s_name: {
                type: Sequelize.STRING(12),
                allowNull: false,
            },
            s_pass: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            s_year: {
                type: Sequelize.STRING(4),
                allowNull: false,
                primaryKey: true,
                defaultValue: 0,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Student',
            tableName: 'students',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Student.belongsToMany(db.Lesson, {
            through: 'Attendace',
            foreignKey: 's_id',
            otherKey: 'l_id',
            as: 'EnrolledLessons',
        });
        db.Student.hasMany(db.Alarm, {
            foreignKey: 's_id',
            sourceKey: 's_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    }    
};

module.exports = Students;