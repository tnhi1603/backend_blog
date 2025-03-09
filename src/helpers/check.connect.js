//check number of connect db
'use strict';
const { default: mongoose } = require("mongoose");
const os = require('os');
const process = require('process');

const second = 5000;

//connect
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
}

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
// ex: maximum connection = 2 * numCores
        if(numConnection > 2 * numCores){
            console.log(`Overload: ${numConnection}`);
        }
    }, second); //monitor every 5s
}

module.exports = {countConnect, checkOverload}; //export mongoose