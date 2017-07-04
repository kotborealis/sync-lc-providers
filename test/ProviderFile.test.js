const ProviderFile = require('../lib/providers/ProviderFile');

const expect = require('chai').expect;

process.on('unhandledRejection', (reason, p) => {
    console.log('Reason: ' + reason, p);
});

describe('ProviderFlie', () => {
    before(() => require('../lib/ffprobe_fixture').__fake = true);
    after(() => require('../lib/ffprobe_fixture').__fake = false);

    const file = new ProviderFile();
    const file_url = 'https://raw.githubusercontent.com/kotborealis/sync-lc-providers/master/test/test.mp3';

    describe('id', () => {
        it('should not do anything', () => {
            expect(file.id(file_url)).to.be.equal(file_url);
        });

        it('should throw nulls on invalid links', () => {
            expect(null).to.be.equal(file.id('http://awooo/ass_we_can'));
        });

        it('should not parse other urls', () => {
            //noinspection BadExpressionStatementJS
            expect(file.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.null;
        });

        it('should not parse invalid urls', () => {
            //noinspection BadExpressionStatementJS
            expect(file.id('http://faf.fof/ass.we.can.mp3.html')).to.be.null;
            //noinspection BadExpressionStatementJS
            expect(file.id('http://faf.fof/ass.we.can.mp3?asasas')).not.to.be.null;
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

        it('should return video info', (done) => {
            file.info('https://nico.awooo.ru/files/目力先輩BB.30519482.mp4').then(entity => {
                expect({ duration: 10,
                    title: '目力先輩BB.30519482.mp4',
                    thumbnail: null,
                    url: 'https://nico.awooo.ru/files/目力先輩BB.30519482.mp4',
                    id: 'https://nico.awooo.ru/files/目力先輩BB.30519482.mp4',
                    type: 'file',
                    disableTiming: false }).to.deep.equal(entity);
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