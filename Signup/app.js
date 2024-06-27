const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');

const router = require('./router');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
    .sync({ force: false }) 
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

// 라우터
app.use('/', router);

// 에러핸들링
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 대기 중`);
});
module.exports = app;
