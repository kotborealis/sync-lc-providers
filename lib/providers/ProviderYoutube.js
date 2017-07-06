const request = require('../request');
const ytTimeToSecs = require('../ytTimeToSecs');

const Provider = require('../Provider');
const EntityYoutube = require('../Entities').youtube;

const YT_API_BASE = 'https://www.googleapis.com/youtube/v3/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            request(`${YT_API_BASE}videos?key=${this.config.key}&part=snippet%2CcontentDetails%2Cstatus&id=${id}`, (err, res) => {
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

                const video = data.items[0];

                if(!video.status.embeddable){
                    reject("Not Embeddable");
                    return;
                }

                if(video.status.uploadStatus === 'deleted'){
                    reject("Deleted");
                    return;
                }

                if(video.status.uploadStatus === 'failed'){
                    reject("Unavailable");
                    return;
                }

                const entity = new EntityYoutube({
                    duration: ytTimeToSecs(video.contentDetails.duration),
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails.default.url,
                    url: `https://www.youtube.com/watch?v=${id}`,
                    id
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};