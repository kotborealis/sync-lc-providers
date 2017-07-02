module.exports = {};

const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

['coub', 'file', 'twitchStream', 'vimeo', 'youtube', 'youtubeList'].forEach(provider => {
    module.exports[provider] = require('./lib/providers/Provider' + capitalize(provider));
});