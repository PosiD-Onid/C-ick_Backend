const Sequelize = require('sequelize');

class Evaluation extends Sequelize.Model {
    static initiate(sequelize) {
        Evaluation.init({
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
            s_classof: {
                type: Sequelize.INTEGER(4),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'students',
                    key: 's_classof',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            s_name: {
                type: Sequelize.STRING(12),
                allowNull: false,
                references: {
                    model: 'students',
                    key: 's_name',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            p_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'performance',
                    key: 'p_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            p_title: {
                type: Sequelize.STRING(30),
                allowNull: false,
                references: {
                    model: 'performance',
                    key: 'p_title',
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
        db.Evaluation.belongsTo(db.Students, { foreignKey: 's_classof', targetKey: 's_classof' }); // 학급으로 연결
        db.Evaluation.belongsTo(db.Students, { foreignKey: 's_name', targetKey: 's_name' }); // ID로 연결
        db.Evaluation.belongsTo(db.Performance, { foreignKey: 'p_id', targetKey: 'p_id' }); // 수행평가 ID로 연결
        db.Evaluation.belongsTo(db.Performance, { foreignKey: 'p_title', targetKey: 'p_title' }); // 수행평가 제목으로 연결
    }
    
}

module.exports = Evaluation;