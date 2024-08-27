const Sequelize = require('sequelize');

class Schedule extends Sequelize.Model {
    static initiate(sequelize) {
        Schedule.init({
            sch_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            sch_day: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            sch_time: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            l_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'lesson',
                    key: 'l_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Schedule',
            tableName: 'schedule',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Schedule.belongsTo(db.Lesson, {
            foreignKey: 'l_id',
            targetKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    };    
}

module.exports = Schedule;