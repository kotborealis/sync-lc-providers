const ProviderCoub = require('../lib/ProviderCoub');
const EntityCoub = require('../lib/EntityCoub');

const expect = require('chai').expect;

describe('ProviderCoub', () => {
    const coub = new ProviderCoub();

    describe('id', () => {
        it('should parse id from url', () => {
            expect('ster').to.equal(coub.id('https://coub.com/view/ster'));
        });

        it('should return id if it\'s already separated from url', () => {
            expect('ster').to.equal(coub.id('ster'));
        });
    });

    describe('info', () => {
        it('should return video info', (done) => {
            coub.info('http://coub.com/view/divbg').then(entity => {
                console.log(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });

    describe('entities', () => {
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