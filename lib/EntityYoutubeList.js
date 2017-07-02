const Entity = require('./Entity');

module.exports = class extends Entity{
    constructor(_){
        super("youtube-list");
        Object.assign(this, _);
    }
};