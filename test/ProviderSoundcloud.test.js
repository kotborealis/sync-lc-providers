const ProviderSoundcloud = require('../lib/providers/ProviderSoundcloud');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderSoundcloud', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const soundcloud = new ProviderSoundcloud({key: 'dd2aaa640b4858b627f02ca84a2045b0'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('https://soundcloud.com/raxxo-1/ng-mare').to.equal(soundcloud.id('https://soundcloud.com/raxxo-1/ng-mare'));
        });

        it('should not parse other urls', () => {
            expect(soundcloud.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.equal(null);
        });
    });

    describe('info', () => {
        it('should return video info', async () => {
            const entity = await soundcloud.info('https://soundcloud.com/raxxo-1/ng-mare');
            expect({ duration: 98,
                title: 'NG Mare',
                thumbnail: 'https://i1.sndcdn.com/artworks-000145582566-ihitj3-t500x500.jpg',
                url: 'https://soundcloud.com/raxxo-1/ng-mare',
                id: 'https://soundcloud.com/raxxo-1/ng-mare',
                type: 'soundcloud',
                disableTiming: false,
                meta: 'https://api.soundcloud.com/tracks/244947903/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0'
            }).to.deep.equal(entity);
        });

        it('should return video info', async () => {
            const entity = await soundcloud.info('https://soundcloud.com/dawn-records/killove-fireproof?in=dawn-records/sets/killove-fireproof');
            expect({ duration: 137,
                title: 'KilLove Fireproof!',
                thumbnail: 'https://i1.sndcdn.com/avatars-000041548876-hex4yq-large.jpg',
                url: 'https://soundcloud.com/dawn-records/killove-fireproof?in=dawn-records/sets/killove-fireproof',
                id: 'https://soundcloud.com/dawn-records/killove-fireproof?in=dawn-records/sets/killove-fireproof',
                type: 'soundcloud',
                disableTiming: false,
                meta: 'https://api.soundcloud.com/tracks/299270767/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0'
            }).to.deep.equal(entity);
        });


        it('should return playlist info', async () => {
            const entity = await soundcloud.info('https://soundcloud.com/dawn-records/sets/killove-fireproof');
            entity.meta = [];
            expect({ duration: 786,
                title: 'KILLOVE FIREPROOF!',
                thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                url: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                id: 'https://soundcloud.com/dawn-records/sets/killove-fireproof',
                type: 'soundcloudList',
                disableTiming: true,
                meta: []
            }).to.deep.equal(entity);
        });
    });

    describe('entities', () => {
        it('should return track entity', async () => {
            const entity = await soundcloud.entities('https://soundcloud.com/raxxo-1/ng-mare');
            expect({ duration: 98,
                title: 'NG Mare',
                thumbnail: 'https://i1.sndcdn.com/artworks-000145582566-ihitj3-t500x500.jpg',
                url: 'https://soundcloud.com/raxxo-1/ng-mare',
                id: 'https://soundcloud.com/raxxo-1/ng-mare',
                type: 'soundcloud',
                disableTiming: false,
                meta: 'https://api.soundcloud.com/tracks/244947903/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0'
            }).to.deep.equal(entity);
        });

        it('should return playlist entities', async () => {
            const entity = await soundcloud.entities('https://soundcloud.com/dawn-records/sets/killove-fireproof');
            expect([ { duration: 137,
                title: 'KilLove Fireproof!',
                thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                url: 'http://soundcloud.com/dawn-records/killove-fireproof',
                id: 'http://soundcloud.com/dawn-records/killove-fireproof',
                type: 'soundcloud',
                disableTiming: true,
                meta: 'https://api.soundcloud.com/tracks/299270767/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 82,
                    title: 'EmotionaRhythm',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/emotionarhythm',
                    id: 'http://soundcloud.com/dawn-records/emotionarhythm',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270763/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 84,
                    title: 'DANGO ON  FIRE',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/dango-on-fire',
                    id: 'http://soundcloud.com/dawn-records/dango-on-fire',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270772/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 99,
                    title: '夜明けのウェアウルフ',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/2cdqufowurbd',
                    id: 'http://soundcloud.com/dawn-records/2cdqufowurbd',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270760/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 120,
                    title: '死んだバラと悪魔のはなし',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/iypto5rgicya',
                    id: 'http://soundcloud.com/dawn-records/iypto5rgicya',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270810/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 81,
                    title: 'SILVER STORM',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/silver-storm',
                    id: 'http://soundcloud.com/dawn-records/silver-storm',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270757/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 95,
                    title: 'ライト・グラフィティ',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/fzmdykvfbrkw',
                    id: 'http://soundcloud.com/dawn-records/fzmdykvfbrkw',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270781/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' },
                { duration: 85,
                    title: '雨の日に',
                    thumbnail: 'https://i1.sndcdn.com/artworks-000199813485-7m1i1f-t500x500.jpg',
                    url: 'http://soundcloud.com/dawn-records/9cs2qm0cd8wt',
                    id: 'http://soundcloud.com/dawn-records/9cs2qm0cd8wt',
                    type: 'soundcloud',
                    disableTiming: true,
                    meta: 'https://api.soundcloud.com/tracks/299270756/stream?client_id=dd2aaa640b4858b627f02ca84a2045b0' }
                ]).to.deep.equal(entity);
        });
    });
});