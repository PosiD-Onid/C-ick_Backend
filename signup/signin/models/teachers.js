const Sequelize = require('sequelize');

class Teachers extends Sequelize.Model {
    static initiate(sequelize) {
        Teachers.init({
            t_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            t_pass: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            t_name: {
                type: Sequelize.STRING(12),
                allowNull: false,
            },
            t_subject: {
                type: Sequelize.STRING(20),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Teacher',
            tableName: 'teachers',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associations(db) {}
}

module.exports = Teachers;