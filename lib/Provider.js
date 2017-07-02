const Cache = require('./cache');

module.exports =  class{
    constructor(config){
        this.config = config;
        this.cache = new Cache();
    }

    id(){
        throw new Error("Not implemented");
    }

    info(){
        throw new Error("Not implemented");
    }

    entities(){
        throw new Error("Not implemented");
    }
};