const request = require('request');
const path = require('path');
const fs = require('fs');
const md5 = require('../../lib/md5');

const fixtures_dir = path.resolve(__dirname, '..', 'fixtures');

module.exports = function(options, callback){
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
};