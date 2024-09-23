const Sequelize = require('sequelize');

class Performance extends Sequelize.Model {
    static initiate(sequelize) {
        Performance.init({
            p_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            p_title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            // p_type: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            // },
            p_place: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            p_content: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
            },
            // p_criteria: {
            //     type: Sequelize.TEXT('tiny'),
            //     allowNull: false,
            // },
            p_startdate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            p_enddate: {
                type: Sequelize.DATE,
                allowNull: true,
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
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Performance',
            tableName: 'performance',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Performance.belongsTo(db.Lesson, {
            foreignKey: 'l_id',
            targetKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
        db.Performance.hasMany(db.Alarm, {
            foreignKey: 'p_id',
            sourceKey: 'p_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    }
}

module.exports = Performance;
