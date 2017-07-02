const request = require('request');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const fixtures_dir = path.resolve(__dirname, '..', 'test', 'fixtures');

module.exports.__fake = false;

function fakerequest(options, callback){
    const url = typeof options === 'string' ? options : options.url;
    const hash = md5(url);
    const fixture_file = path.join(fixtures_dir, hash + '.txt');

    if(!fs.existsSync(fixture_file)){
        console.warn("Fixture " + hash + " does not exists, downloading...");
        request(options, (err, res) => {
            fs.writeFileSync(fixture_file, res.body);
            callback(err, res);
        });
    }
    else{
        const body = fs.readFileSync(fixture_file);
        callback(null, {body});
    }
}

function md5(input) {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
}

module.exports.request = (...args) => {
    if(module.exports.__fake){
        return fakerequest(...args);
    }
    else{
        return request(...args);
    }
};