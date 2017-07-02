const request = require('request');

const Provider = require('./Provider');
const EntityYoutube = require('./EntityYoutube');

const RE_YOUTUBE = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
const RE_YOUTUBE_ID = /(\w|-){11}/;
const YT_API_BASE = 'https://www.googleapis.com/youtube/v3/';

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.info = this.info.bind(this);
        this.entities = this.entities.bind(this);
    }

    id(url){
        const url_match = url.match(RE_YOUTUBE);
        if(url_match){
            return url_match[1];
        }
        else if(RE_YOUTUBE_ID.test(url)){
            return url;
        }
        else{
            return null;
        }
    }

    info(id){
        id = this.id(id);

        return new Promise((resolve, reject) => {
            request.get(`${YT_API_BASE}videos?key=${this.config.key}&part=snippet%2CcontentDetails%2Cstatus&id=${id}`, (err, res) => {
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

    entities(id){
        return this.info(id);
    }
};

function ytTimeToSecs(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    return hours * 3600 + minutes * 60 + seconds;
}