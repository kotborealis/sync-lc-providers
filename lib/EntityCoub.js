const Entity = require('./Entity');

module.exports = class extends Entity{
    constructor(_){
        super("coub");
        Object.assign(this, _);
    }
};