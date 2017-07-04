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
                expect({ duration: 98,
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


        it('should return playlist info', (done) => {
            soundcloud.info('https://soundcloud.com/dawn-records/sets/killove-fireproof').then(entity => {
                entity.meta = [];
                expect({ duration: 786,
                    title: 'KILLOVE FIREPROOF!',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-large.jpg',
                    url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                    id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                    type: 'soundcloudList',
                    disableTiming: false,
                    meta: [] }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });

    describe('entities', () => {
        it('should return track entity', (done) => {
            soundcloud.entities('https://soundcloud.com/raxxo-1/ng-mare').then(entity => {
                expect({ duration: 98,
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

        it('should return playlist entities', (done) => {
            soundcloud.entities('https://soundcloud.com/dawn-records/sets/killove-fireproof').then(entity => {
                expect([ { duration: 137,
                    title: 'KilLove Fireproof!',
                    thumbnail: null,
                    url: 'http://soundcloud.com/dawn-records/killove-fireproof',
                    id: 'http://soundcloud.com/dawn-records/killove-fireproof',
                    type: 'soundcloud',
                    disableTiming: false },
                    { duration: 82,
                        title: 'EmotionaRhythm',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/emotionarhythm',
                        id: 'http://soundcloud.com/dawn-records/emotionarhythm',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 84,
                        title: 'DANGO ON  FIRE',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/dango-on-fire',
                        id: 'http://soundcloud.com/dawn-records/dango-on-fire',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 99,
                        title: '夜明けのウェアウルフ',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/2cdqufowurbd',
                        id: 'http://soundcloud.com/dawn-records/2cdqufowurbd',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 120,
                        title: '死んだバラと悪魔のはなし',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/iypto5rgicya',
                        id: 'http://soundcloud.com/dawn-records/iypto5rgicya',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 81,
                        title: 'SILVER STORM',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/silver-storm',
                        id: 'http://soundcloud.com/dawn-records/silver-storm',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 95,
                        title: 'ライト・グラフィティ',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/fzmdykvfbrkw',
                        id: 'http://soundcloud.com/dawn-records/fzmdykvfbrkw',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 85,
                        title: '雨の日に',
                        thumbnail: null,
                        url: 'http://soundcloud.com/dawn-records/9cs2qm0cd8wt',
                        id: 'http://soundcloud.com/dawn-records/9cs2qm0cd8wt',
                        type: 'soundcloud',
                        disableTiming: false } ]).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});