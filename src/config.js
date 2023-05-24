require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
        userLogged: process.env.USERID || 0
    },
    jwt:{
        secret: process.env.JET_SECRET || 'notasecreta!'
    },
    mysql: {
        host: process.env.HOSTNAME || 'localhost',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DATABASE || 'videos'
    }
}