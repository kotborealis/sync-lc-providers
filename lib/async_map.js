module.exports = async (collection, fn) => {
    const res = [];
    for(let item of collection){
        res.push(await fn(item));
    }
    return res;
};