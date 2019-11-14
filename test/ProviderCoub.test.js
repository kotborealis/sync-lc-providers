const ProviderCoub = require('../lib/providers/ProviderCoub');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderCoub', () => {
    const coub = new ProviderCoub({
        request: require('./mocks/request')
    });

    describe('id', () => {
        it('should parse id from url', () => {
            expect('ster').to.equal(coub.id('https://coub.com/view/ster'));
        });

        it('should not parse other urls', () => {
            expect(coub.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.equal(null);
        });
    });

    describe('info', () => {
        it('should return video info', async () => {
            const entity = await coub.info('http://coub.com/view/divbg');
            expect({ duration: null,
                title: 'wheeel',
                thumbnail: 'http://s.storage.akamai.coub.com/get/b114/p/coub/simple/cw_image/ba6f7233a15/767324b7e4f6bf5cdf015/med_1474010492_00032.jpg',
                url: 'https://coub.com/view/divbg',
                type: 'coub',
                disableTiming: false,
                id: 'divbg'
            }).to.deep.equal(entity);
        });
    });
});