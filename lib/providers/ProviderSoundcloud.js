const request = require('../request');

const Provider = require('../Provider');
const Entity = require('../Entities').soundcloud;

const SC_API_BASE = 'http://api.soundcloud.com/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
        this.re_id = /\d+/;
    }

    id(url){
        return this.re.test(url) ? url : null;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            request(`${SC_API_BASE}resolve?url=${id}&client_id=${this.config.key}`, (err, res) => {
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

                if(data.embeddable_by !== 'all'){
                    reject("Not Embeddable");
                    return;
                }

                const entity = new Entity({
                    duration: data.duration,
                    title: data.title,
                    thumbnail: data.artwork_url,
                    url: id,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};