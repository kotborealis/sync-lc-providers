const ProviderCoub = require('../lib/providers/ProviderCoub');

const expect = require('chai').expect;

describe('ProviderCoub', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const coub = new ProviderCoub();

    describe('id', () => {
        it('should parse id from url', () => {
            expect('ster').to.equal(coub.id('https://coub.com/view/ster'));
        });

        it('should not parse other urls', () => {
            //noinspection BadExpressionStatementJS
            expect(coub.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.null;
        });
    });

    describe('info', () => {
        it('should return video info', (done) => {
            coub.info('http://coub.com/view/divbg').then(entity => {
                expect({ duration: null,
                    title: 'wheeel',
                    thumbnail: 'http://s.storage.akamai.coub.com/get/b114/p/coub/simple/cw_image/ba6f7233a15/767324b7e4f6bf5cdf015/med_1474010492_00032.jpg',
                    url: 'https://coub.com/view/divbg',
                    type: 'coub',
                    disableTiming: false,
                    id: 'divbg' }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});