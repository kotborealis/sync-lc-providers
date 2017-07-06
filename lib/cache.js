module.exports = function(){
    let id = null;
    let entity = null;

    this.has = _id => _id === id;
    this.get = _id => this.has(_id) ? Object.assign({}, entity) : null;
    this.set = (_id, _entity) => {
        id = _id;
        entity = _entity;
    }
};