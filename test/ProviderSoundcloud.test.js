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
        it('should return track entity', () => {
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
                expect([ { duration: 137.26,
                    title: 'KilLove Fireproof!',
                    thumbnail: null,
                    url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                    id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                    type: 'soundcloud',
                    disableTiming: false },
                    { duration: 82.71,
                        title: 'EmotionaRhythm',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 84.278,
                        title: 'DANGO ON  FIRE',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 99.875,
                        title: '夜明けのウェアウルフ',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 120.121,
                        title: '死んだバラと悪魔のはなし',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 81.169,
                        title: 'SILVER STORM',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 95.199,
                        title: 'ライト・グラフィティ',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false },
                    { duration: 85.846,
                        title: '雨の日に',
                        thumbnail: null,
                        url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                        type: 'soundcloud',
                        disableTiming: false } ]).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});