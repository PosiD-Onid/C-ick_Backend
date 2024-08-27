const Sequelize = require('sequelize');

class Alarm extends Sequelize.Model {
    static initiate(sequelize) {
        Alarm.init({
            a_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            a_title: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            a_content: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            l_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'lesson',
                    key: 'l_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            p_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'performance',
                    key: 'p_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Alarm',
            tableName: 'alarm',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Alarm.belongsTo(db.Performance, {
            foreignKey: 'p_id',
            targetKey: 'p_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
        db.Alarm.belongsTo(db.Lesson, {
            foreignKey: 'l_id',
            targetKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    }
}

module.exports = Alarm;