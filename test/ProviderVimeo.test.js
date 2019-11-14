const ProviderVimeo = require('../lib/providers/ProviderVimeo');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderVimeo', () => {
    const Vimeo = new ProviderVimeo({
        request: require('./mocks/request')
    });

    describe('id', () => {
        it('should parse id from url', () => {
            expect('115495563').to.equal(Vimeo.id('https://vimeo.com/115495563'));
        });

        it('should not parse other urls', () => {
            expect(Vimeo.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.equal(null);
        });
    });

    describe('info', () => {
        it('should return video info', async () => {
            const entity = await Vimeo.info('http://vimeo.com/115495563');
            expect({
                duration: 230,
                title: '[MAD] JoJo\'s Bizarre Adventure - Part 4 - Diamond is Unbreakable',
                thumbnail: 'https://i.vimeocdn.com/video/501535009_120x90.jpg',
                url: 'https://vimeo.com/115495563',
                type: 'vimeo',
                disableTiming: false,
                id: '115495563'
            }).to.deep.equal(entity);
        });
    });
});