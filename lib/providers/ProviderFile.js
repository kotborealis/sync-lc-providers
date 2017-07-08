const ffprobe = require('../ffprobe_fixture').ffprobe;

const Provider = require('../Provider');
const EntityFile = require('../Entities').file;

const SUPPORTED_FORMATS = ['mp3', 'mp4', 'webm', 'mkv'];

module.exports = class extends Provider{
    constructor(config){
        super(config);

        this.re = /.+\.(webm|mp4|mp3|mkv)[^\.]*$/;
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
                _: id.indexOf('%') < 0 ? encodeURI(id) : id,
                v: 'quiet',
                print_format: 'json',
                show_format: true,
                show_streams: true
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

                if(!data.streams || !data.streams.length){
                    reject("Not Supported");
                    return;
                }

                let isVideo = false;

                data.streams.forEach(stream => isVideo = isVideo || stream.codec_type === 'video');

                const {format_name: format, duration, tags: {title = id.split('/').pop()} = {}} = data.format;

                let supported = false;
                for(let f of SUPPORTED_FORMATS){
                    if(format.indexOf(f) >= 0){
                        supported = true;
                        break;
                    }
                }

                if(!supported){
                    reject("Not Supported");
                    return;
                }

                const entity = new EntityFile({
                    duration: parseInt(duration),
                    title,
                    thumbnail: null,
                    url: id,
                    id,
                    meta: {isVideo}
                });

                this.cache.set(id, entity);

                resolve(entity);
            });
        });
    };
};