const Entity = require('./Entity');

module.exports = class extends Entity{
    constructor(_){
        super("twitch-stream");
        Object.assign(this, _);
    }
};