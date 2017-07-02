const request = require('request');

const Provider = require('./Provider');
const EntityCoub = require('./EntityCoub');

const RE_COUB = /https?:\/\/(?:www\.)?coub\.com\/view\/(.+)\/?/;
const RE_COUB_ID = /[a-zA-Z0-9_]{3,5}/;
const COUB_API_BASE = 'http://coub.com/api/v2/coubs/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.info = this.info.bind(this);
        this.entities = this.entities.bind(this);
    }

    id(url){
        const url_match = url.match(RE_COUB);
        if(url_match){
            return url_match[1];
        }
        else if(RE_COUB_ID.test(url)){
            return url;
        }
        else{
            return null;
        }
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            request.get(`${COUB_API_BASE}${id}.json`, (err, res) => {
                if(err){
                    reject("Network Error");
                    return;
                }

                let data = null;
                try{
                    data = JSON.parse(res.body);
                }
                catch(e){
                    reject("JSON Error");
                    return;
                }

                const entity = new EntityCoub({
                    duration: null,
                    title: data.title,
                    thumbnail: data.image_versions.template.replace('%{version}', 'med'),
                    url: `https://coub.com/view/${id}`,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};