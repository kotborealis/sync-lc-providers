const ProviderSoundcloud = require('../lib/providers/ProviderSoundcloud');

const expect = require('chai').expect;

describe('ProviderSoundcloud', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const soundcloud = new ProviderSoundcloud({key: 'dd2aaa640b4858b627f02ca84a2045b0'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('https://soundcloud.com/raxxo-1/ng-mare').to.equal(soundcloud.id('https://soundcloud.com/raxxo-1/ng-mare'));
        });
    });

    describe('info', () => {
        it('should return video info', (done) => {
            soundcloud.info('https://soundcloud.com/raxxo-1/ng-mare').then(entity => {
                expect({ duration: 98463,
                    title: 'NG Mare',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000145582566-ihitj3-large.jpg',
                    url: 'https://soundcloud.com/raxxo-1/ng-mare',
                    id: 'https://soundcloud.com/raxxo-1/ng-mare',
                    type: 'soundcloud',
                    disableTiming: false }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});