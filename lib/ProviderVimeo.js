const request = require('request');

const Provider = require('./Provider');
const EntityVimeo = require('./EntityVimeo');

const RE_VIMEO = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:$|\/)/;
const RE_VIMEO_ID = /\d+/;
const VIMEO_API_BASE = 'https://vimeo.com/api/oembed.json?url=';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.info = this.info.bind(this);
        this.entities = this.entities.bind(this);
    }

    id(url){
        const url_match = url.match(RE_VIMEO);
        if(url_match){
            return url_match[1];
        }
        else if(RE_VIMEO_ID.test(url)){
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

            request.get(`${VIMEO_API_BASE}https://vimeo.com/${id}`, (err, res) => {
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

                const entity = new EntityVimeo({
                    duration: data.duration,
                    title: data.title,
                    thumbnail: `https://i.vimeocdn.com/video/${data.thumbnail_url.match(/\/(\d+)_.*/)[1]}_120x90.jpg`,
                    url: `https://vimeo.com/${id}`,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};