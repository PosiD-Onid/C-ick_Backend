const Sequelize = require('sequelize');

class Attendace extends Sequelize.Model {
    static initiate(sequelize) {
        Attendace.init({
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
            s_classof: {
                type: Sequelize.STRING(4),
                allowNull: false,
                references: {
                    model: 'students',
                    key: 's_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Attendace',
            tableName: 'attendace',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Attendace.belongsTo(db.Lesson, {
            foreignKey: 'l_id',
            targetKey: 'l_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
        db.Attendace.belongsTo(db.Student, {
            foreignKey: 's_id',
            targetKey: 's_id',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    }    
};

module.exports = Attendace;