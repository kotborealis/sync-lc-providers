const Entity = require('./Entity');

module.exports = class extends Entity{
    constructor(_){
        super("vimeo");
        Object.assign(this, _);
    }
};