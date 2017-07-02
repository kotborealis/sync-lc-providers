const Entity = require('./Entity');

module.exports = class extends Entity{
    constructor(_){
        super("youtube");
        Object.assign(this, _);
    }
};