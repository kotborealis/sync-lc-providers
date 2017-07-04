const EntityFactory = require('./EntityFactory');

module.exports = {
    coub: EntityFactory('coub'),
    file: EntityFactory('file'),
    twitchStream: EntityFactory('twitchStream'),
    vimeo: EntityFactory('vimeo'),
    youtube: EntityFactory('youtube'),
    youtubeList: EntityFactory('youtubeList'),
};