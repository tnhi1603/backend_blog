'use strict'; //strict mode: catch common coding errors and "unsafe" actions

const { default: mongoose } = require("mongoose"); 
const { countConnect } = require("../helpers/check.connect");
const { db: {host, name, port} } = require("../configs/config.mongodb");

const connectString = `mongodb://${host}:${port}/${name}`
console.log(connectString);

class Database{
    constructor(){
        this.connect();
    }
    connect(type='mongodb'){
        if(1 === 1){
            mongoose.set('debug', true);
            mongoose.set('debug',{color: true});
          }          
        mongoose.connect(connectString).then(() => {
            console.log("MongoDB connected ok");
            countConnect();
          }).catch((err) => {
            console.error(err);
          });
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new Database();
        }
        return this.instance;
    }
}

const db = Database.getInstance();
module.exports = db;