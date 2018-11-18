const ProviderYoutube = require('../lib/providers/ProviderYoutube');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderYoutube', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const youtube = new ProviderYoutube({key: 'AIzaSyDpRpBquRTLhmifkJdNM78QgqjD0SDpkIM'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://www.youtube.com/watch?v=dBbQMXuFM9w'));
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://www.youtube.com/watch?v=dBbQMXuFM9w&index=58&list=PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://youtu.be/dBbQMXuFM9w?list=PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
            expect('E-68IxmGaoA').to.equal(youtube.id('https://youtu.be/E-68IxmGaoA'));
        });
    });

    describe('info', () => {
        it('should return promise with video info', async () => {
            const entity = await youtube.info('http://youtube.com/watch?v=iNCRfh6dx60');
            expect({
                duration: 195,
                title: 'ChunnHEbyou',
                thumbnail: 'https://i.ytimg.com/vi/iNCRfh6dx60/default.jpg',
                url: 'https://www.youtube.com/watch?v=iNCRfh6dx60',
                type: 'youtube',
                id: 'iNCRfh6dx60',
                disableTiming: false
            }).to.deep.equal(entity);
        });


        it('should reject non-existing videos', async () => {
            await expect(youtube.info("asswecan")).to.be.rejectedWith('Not Found');
        });

        it('should reject non-embeddable videos', async () => {
            await expect(youtube.info("https://youtu.be/E-68IxmGaoA")).to.be.rejectedWith('Not Embeddable');
        });
    });

    describe('24h', () => {
       it('should work with 24h videos', async () => {
           const entity = await youtube.info('https://www.youtube.com/watch?v=Wd2HoTfT7N0');
           expect(86401).to.deep.equal(entity.duration);
       })
    });
});