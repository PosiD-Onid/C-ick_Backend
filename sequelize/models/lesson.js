const Sequelize = require('sequelize');

class Lesson extends Sequelize.Model {
    static initiate(sequelize) {
        Lesson.init({
            l_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            l_title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            l_content: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
            },
            l_year: {
                type: Sequelize.STRING(4),
                allowNull: false,
            },
            l_semester: {
                type: Sequelize.STRING(1),
                allowNull: false,
            },
            l_grade: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            l_class: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            l_place: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            t_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
                references: {
                    model: 'teachers',
                    key: 't_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Lesson',
            tableName: 'lesson',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Lesson.hasMany(db.Schedule, {
            foreignKey: 'l_id',
            sourceKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
        db.Lesson.hasMany(db.Performance, {
            foreignKey: 'l_id',
            sourceKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    }
};    

module.exports = Lesson;