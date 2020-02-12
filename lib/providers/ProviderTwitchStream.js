const Provider = require('../Provider');
const EntityTwitchStream = require('../Entities').twitchStream;

const TWITCH_API_BASE = 'https://api.twitch.tv/kraken/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /https?:\/\/(?:www\.)?twitch\.(?:com|tv)\/([a-zA-Z0-9_]{4,25})\/?$/;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            const options = {
                url: `${TWITCH_API_BASE}users?login=${id}`,
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': this.config.key
                }
            };

            this.request(options, (err, res) => {
                if(err){
                    reject("Network Error");
                    return;
                }

                let data = null;
                try{
                    data = JSON.parse(res.body);
                }
                catch(e){
                    reject('JSON Error');
                    return;
                }

                const [user] = data.users;

                const entity = new EntityTwitchStream({
                    duration: null,
                    title: user.display_name,
                    thumbnail: user.logo,
                    url: `https://twitch.tv/${id}`,
                    disableTiming: true,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};