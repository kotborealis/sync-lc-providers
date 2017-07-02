const request = require('request');

const Provider = require('./Provider');
const EntityTwitchStream = require('./EntityTwitchStream');

const RE_TWITCH_CHANNEL = /https?:\/\/(?:www\.)?twitch\.(?:com|tv)\/([a-zA-Z0-9_]{4,25})\/?$/;
const RE_TWITCH_CHANNEL_ID = /[a-zA-Z0-9_]{4,25}/;
const TWITCH_API_BASE = 'https://api.twitch.tv/kraken/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.info = this.info.bind(this);
        this.entities = this.entities.bind(this);
    }

    id(url){
        const url_match = url.match(RE_TWITCH_CHANNEL);
        if(url_match){
            return url_match[1];
        }
        else if(RE_TWITCH_CHANNEL_ID.test(url)){
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

            const options = {
                url: `${TWITCH_API_BASE}channels/${id}`,
                headers: {
                    'Accept':  'application/vnd.twitchtv.v3+json',
                    'Client-ID': this.config.key
                }
            };

            request(options, (err, res) => {
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

                const entity = new EntityTwitchStream({
                    duration: null,
                    title: `${data.game ? `[${data.game}]` : ''} ${data.display_name}${data.status ? ` — ${data.status}` : ''}`,
                    thumbnail: data.logo,
                    url: data.url,
                    disableTiming: true,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };

    entities(id){
        return this.info(id);
    }
};