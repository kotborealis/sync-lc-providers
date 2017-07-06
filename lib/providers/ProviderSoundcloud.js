const request = require('../request');

const Provider = require('../Provider');
const Entity = require('../Entities').soundcloud;
const EntityList = require('../Entities').soundcloudList;

const SC_API_BASE = 'http://api.soundcloud.com/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
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

                if(data.embeddable_by !== 'all' || !data.streamable){
                    reject("Not Embeddable");
                    return;
                }

                if(data.kind !== 'track' && data.kind !== 'playlist'){
                    reject("Not Found");
                    return;
                }

                const _Entity = data.kind === 'track' ? Entity : EntityList;

                const entity = new _Entity({
                    duration: Math.floor(data.duration/1000),
                    title: data.title,
                    thumbnail: getThumbnail(data),
                    url: id,
                    id,
                    meta: data.stream_url + '?client_id=' + this.config.key
                });

                if(data.kind === 'playlist'){
                    entity.meta = data.tracks;
                    entity.disableTiming = true;
                }

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };

    entities(id){
        return new Promise(async (resolve, reject) => {
            const entity = await this.info(id);
            if(entity.type === 'soundcloud'){
                resolve(entity);
                return;
            }

            const list = entity.meta.map(data => {
                return new Entity({
                    duration: Math.floor(data.duration/1000),
                    title: data.title,
                    thumbnail: data.artwork_url ? getThumbnail(data) : entity.thumbnail,
                    url: data.permalink_url,
                    id: data.permalink_url,
                    meta: data.stream_url + '?client_id=' + this.config.key,
                    disableTiming: true
                });
            });

            resolve(list);
        });
    }
};

function getThumbnail(data){
    let thumbnail = null;
    if(data.artwork_url){
        thumbnail = data.artwork_url.replace('large', 't500x500');
    }
    else if(data.user.avatar_url){
        thumbnail = data.user.avatar_url;
    }
    return thumbnail;
}