module.exports = {};

const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('');

['coub', 'file', 'twitchStream', 'vimeo', 'youtube', 'youtubeList', 'soundcloud'].forEach(provider => {
    module.exports[provider] = require('./lib/providers/Provider' + capitalize(provider));
});