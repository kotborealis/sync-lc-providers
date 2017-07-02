const Cache = require('./cache');

module.exports =  class{
    constructor(config){
        this.config = config;
        this.cache = new Cache();
    }

    id(url){
        const url_match = url.match(this.re);
        if(url_match){
            return url_match[1];
        }
        else if(this.re_id.test(url)){
            return url;
        }
        else{
            return null;
        }
    }

    info(){
        throw new Error("Not implemented");
    }

    entities(id){
        return this.info(id);
    }
};