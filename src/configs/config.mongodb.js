'use strict';

const dev ={
    app: {
        port: process.env.DEV_APP_PORT || 3001
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME 
    }
}
const pro ={
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'express-mongo-pro'
    }
}
const config = {dev, pro};
const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];