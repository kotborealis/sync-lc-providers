const async_map = require('../async_map');

const Provider = require('../Provider');
const ProviderYoutube = require('./ProviderYoutube');
const EntityYoutube = require('../Entities').youtube;
const EntityYoutubeList = require('../Entities').youtubeList;

const YT_API_BASE = 'https://www.googleapis.com/youtube/v3/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.listPage = this.listPage.bind(this);
        this.listLoader= this.listLoader.bind(this);
        this.entityInfo= this.entityInfo.bind(this);

        this.youtube = new ProviderYoutube(config);

        this.re = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/playlist\?list=)((\w|_|-){4,64})(?:\S+)?/;;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            this.request(`${YT_API_BASE}playlists?key=${this.config.key}&part=ContentDetails%2Csnippet&id=${id}`, (err, res) => {
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

                if(data.error && data.error.code === 400){
                    reject("Bad Request");
                    return;
                }

                if(!data.items.length){
                    reject("Not Found");
                    return;
                }

                const list = data.items[0];

		const {thumbnails} = list.snippet;

                const entity = new EntityYoutubeList({
                    duration: null,
                    title: list.snippet.title,
                    thumbnail: thumbnails.default ? thumbnails.default.url : null,
                    url: `https://www.youtube.com/playlist?list=${id}`,
                    disableTiming: true,
                    id,
                    meta: {count: list.contentDetails.itemCount}
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };

    entities(id){
        id = this.id(id);

        return this.listLoader(id);
    }

    listLoader(id){
        let entities_list = [];
        return new Promise(async (resolve, reject) => {
            let list = [], pageToken = '';

            do{
                ({list, pageToken} = await this.listPage(id, pageToken));
                entities_list = entities_list.concat(list);
            } while(pageToken);

            resolve(entities_list);
        });
    }

    listPage(id, pageToken){
        return new Promise((resolve, reject) => {
            this.request(`${YT_API_BASE}playlistItems?key=${this.config.key}&part=ContentDetails&playlistId=${id}&pageToken=${pageToken}`, async (err, res)=> {
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

                if(data.error && data.error.code === 400){
                    reject("Bad Request");
                    return;
                }

                if(!data.items.length){
                    reject("Not Found");
                    return;
                }

                resolve({
                    pageToken: data.nextPageToken,
                    list: (await async_map(data.items.map(video => video.contentDetails.videoId), this.entityInfo)).filter(i => i)
                });
            });
        });
    }

    async entityInfo(id){
        try{
            return await this.youtube.info(`https://www.youtube.com/watch?v=${id}`);
        }
        catch(e){
            return null;
        }
    }
};
