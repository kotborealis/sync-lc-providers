const Provider = require('../Provider');
const EntityCoub = require('../Entities').coub;

const COUB_API_BASE = 'http://coub.com/api/v2/coubs/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /https?:\/\/(?:www\.)?coub\.com\/view\/(.+)\/?/;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            this.request(`${COUB_API_BASE}${id}.json`, (err, res) => {
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