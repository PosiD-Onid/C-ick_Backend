const Sequelize = require('sequelize');

class Evaluation extends Sequelize.Model {
    static initiate(sequelize) {
        Evaluation.init({
            e_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            e_score: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 100,
                },
                defaultValue: 0,
            },
            e_check: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            e_checkdate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            s_classof: {
                type: Sequelize.INTEGER(4),
                allowNull: false,
                references: {
                    model: 'students',
                    key: 's_classof',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
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
            modelName: 'Evaluation',
            tableName: 'evaluation',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {
        db.Evaluation.belongsTo(db.Student, { foreignKey: 's_classof' });
        db.Evaluation.belongsTo(db.Performance, { foreignKey: 'p_id' });
    }
}

module.exports = Evaluation;
