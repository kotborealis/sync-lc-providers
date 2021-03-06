const Provider = require('../Provider');
const EntityVimeo = require('../Entities').vimeo;

const VIMEO_API_BASE = 'https://vimeo.com/api/oembed.json?url=';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:$|\/)/;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            this.request(`${VIMEO_API_BASE}https://vimeo.com/${id}`, (err, res) => {
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