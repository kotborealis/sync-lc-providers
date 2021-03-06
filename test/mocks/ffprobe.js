const ffprobe = require('../../lib/ffprobe');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const fixtures_dir = path.resolve(__dirname, '..', 'fixtures');

function md5(input) {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = function (args){
    return new Promise((resolve, reject) => {
        const hash = md5(JSON.stringify(args));
        const fixture_file = path.join(fixtures_dir, hash + '.txt');

        if(!fs.existsSync(fixture_file)){
            console.warn("Fixture " + hash + " does not exists, downloading...");
            ffprobe(args).then(stdout => {
                fs.writeFileSync(fixture_file, stdout);
                resolve(stdout);
            }).catch(stderr => reject(stderr));
        }
        else{
            const stdout = fs.readFileSync(fixture_file);
            resolve(stdout);
        }
    });
};