const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
});

const Student = require('./student');
const Lesson = require('./lesson');
const Teacher = require('./teacher');
const Subject = require('./subject');
const Assessment = require('./assessment');

const db = {
    sequelize,
    Sequelize,
    Student: Student.init(sequelize),
    Lesson: Lesson.init(sequelize),
    Teacher: Teacher.init(sequelize),
    Subject: Subject.init(sequelize),
    Assessment: Assessment.init(sequelize),
};

Object.values(db).forEach(model => {
    if (model.associate) {
        model.associate(db);
    }
});

module.exports = db;
