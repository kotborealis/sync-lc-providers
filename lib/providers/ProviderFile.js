const ffprobe = require('../ffprobe_fixture').ffprobe;

const Provider = require('../Provider');
const EntityFile = require('../Entities').file;

const SUPPORTED_FORMATS = ['mp3', 'mp4', 'webm', 'mkv'];

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /(https?:\/\/[\w\._~:/?#\[\]@!$&'()*+,;=%-]*\.(webm|mp4|mp3|mkv))/;
    }

    id(url){
        return this.re.test(url) ? url : null;
    }

    info(id){
        return new Promise((resolve, reject) => {
            if(this.cache.has(id)){
                resolve(this.cache.get(id));
                return;
            }

            ffprobe({
                _: id,
                v: 'quiet',
                print_format: 'json',
                show_format: true
            }).then(stdout => {
                let data;
                try{
                    data = JSON.parse(stdout);
                }
                catch(e){
                    reject("JSON Error");
                    return;
                }

                if(!data.format){
                    reject("Not Found");
                    return;
                }

                const {format_name: format, duration, tags: {title = id.split('/').pop()}} = data.format;

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

                resolve(entity);
            });
        });
    };
};