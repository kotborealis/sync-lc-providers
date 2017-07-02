const Entity = require('./Entity');

module.exports = type => class extends Entity{
    constructor(_){
        super(type);
        Object.assign(this, _);
    }
};