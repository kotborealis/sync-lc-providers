const request = require('request');

const ffprobe = require('../ffprobe');

const Provider = require('../Provider');
const EntityFile = require('../entities/EntityFile');

const SUPPORTED_FORMATS = ['mp3', 'mp4', 'webm', 'mkv'];

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re_id = this.re = new RegExp(`(https?:\/\/[\w\._~:/?#\[\]@!$&'()*+,;=%]*\.(?:${SUPPORTED_FORMATS.join('|')}))`);
    }

    info(id){
        return new Promise(async (resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            let data;
            try{
                const stdout = await ffprobe({
                    _: id,
                    v: 'quiet',
                    print_format: 'json',
                    show_format: true
                });
                data = JSON.parse(stdout);
            }
            catch(e){
                reject(e);
                return;
            }

            const {format_name: format, duration, tags: {title = id.split('/').pop()}} = data;

            if(SUPPORTED_FORMATS.indexOf(format) < 0){
                reject("Unsupported format");
                return;
            }

            const entity = new EntityFile({
                duration: parseInt(duration),
                title,
                thumbnail: null,
                url: id,
                id
            });

            this.cache.set(id, entity);
        });
    };
};