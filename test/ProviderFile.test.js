const ProviderFile = require('../lib/providers/ProviderFile');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderFlie', () => {
    const file = new ProviderFile({
        ffprobe: require('./mocks/ffprobe')
    });
    const file_url = 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3';

    describe('id', () => {
        it('should not do anything', () => {
            expect(file.id(file_url)).to.be.equal(file_url);
        });

        it('should throw nulls on invalid links', () => {
            expect(null).to.be.equal(file.id('http://awooo/ass_we_can'));
        });

        it('should not parse other urls', () => {
            expect(file.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.equal(null);
        });

        it('should not parse invalid urls', () => {
            expect(file.id('http://faf.fof/ass.we.can.mp3.html')).to.be.equal(null);
            expect(file.id('http://faf.fof/ass.we.can.mp3?asasas')).not.to.be.equal(null);
        });
    });

    describe('info', function(){
        this.timeout(15000);
        it('should return video info', async () => {
            const entity = await file.info(file_url);
            expect({ duration: 122,
                title: 'test.mp3',
                thumbnail: null,
                url: 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3',
                type: 'file',
                disableTiming: false,
                meta: {isVideo: false},
                id: 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3'
            }).to.deep.equal(entity);
        });

        it('should reject 404-videos', () => {
            expect(file.info("asswecan")).to.be.rejectedWith('Not Found');
        });
    });
});