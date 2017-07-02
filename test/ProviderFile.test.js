const ProviderFile = require('../lib/providers/ProviderFile');
const EntityFile = require('../lib/entities/EntityFile');

const expect = require('chai').expect;

process.on('unhandledRejection', (reason, p) => {
    console.log('Reason: ' + reason, p);
});

describe('ProviderFlie', () => {
    const file = new ProviderFile();
    const file_url = 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3';

    describe('id', () => {
        it('should not do anything', () => {
            expect(file.id(file_url)).to.be.equal(file_url);
        });

        it('should throw nulls on invalid links', () => {
            expect(null).to.be.equal(file.id('http://awooo/ass_we_can'));
        });
    });

    describe('info', function(){
        this.timeout(15000);
        it('should return video info', (done) => {
            file.info(file_url).then(entity => {
                expect({ duration: 122,
                    title: 'test.mp3',
                    thumbnail: null,
                    url: 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3',
                    type: 'file',
                    disableTiming: false,
                    id: 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3' }).to.deep.equal(entity);
                done();
            });
        });

        it('should reject 404-videos', (done) => {
            file.info(file_url + "AAAAAAAAAAAAAAAAAAAA.mp3").catch(reason => {
                expect(reason).to.equal("Not Found");
                done();
            });
        });
    });
});