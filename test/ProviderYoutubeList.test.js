const ProviderYoutubeList = require('../lib/providers/ProviderYoutubeList');

const expect = require('chai').expect;

describe('ProviderYoutubeList', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const youtube = new ProviderYoutubeList({key: 'AIzaSyDpRpBquRTLhmifkJdNM78QgqjD0SDpkIM'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm').to.equal(youtube.id('https://www.youtube.com/playlist?list=PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
        });

        it('should return id if it\'s already separated from url', () => {
            expect('PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm').to.equal(youtube.id('PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
        });

        it('should not parse other urls', () => {
            //noinspection BadExpressionStatementJS
            expect(youtube.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.null;
        });
    });

    describe('info', () => {
        it('should return promise with list info', (done) => {
            youtube.info('https://www.youtube.com/playlist?list=PLN1mjQ-i1XV5zC72G4NyaFANSeVAIL43U').then(entity => {
                expect({
                    duration: null,
                    title: 'sync-lc-providers-test',
                    thumbnail: 'https://i.ytimg.com/vi/XgoAVRdj1HI/default.jpg',
                    url: 'https://www.youtube.com/playlist?list=PLN1mjQ-i1XV5zC72G4NyaFANSeVAIL43U',
                    type: 'youtubeList',
                    id: 'PLN1mjQ-i1XV5zC72G4NyaFANSeVAIL43U',
                    disableTiming: true
                }).to.deep.equal(entity);
                done();
            }).catch(reason => expect(reason).to.be(null));
        });


        it('should reject non-existing videos', (done) => {
            youtube.info('asswecan').then(entity => {
                expect(entity).to.be(null);
                done();
            }).catch(reason => {
                expect("Not Found").to.equal(reason);
                done();
            });
        });
    });

    describe('entities', function(){
        it('should return array of list entities', function(done){
            youtube.entities('https://www.youtube.com/playlist?list=PLN1mjQ-i1XV5zC72G4NyaFANSeVAIL43U').then(entities => {
                expect([
                    {
                        duration: 60,
                        title: 'Bonetrousleを食べたら・・・',
                        thumbnail: 'https://i.ytimg.com/vi/XgoAVRdj1HI/default.jpg',
                        url: 'https://www.youtube.com/watch?v=XgoAVRdj1HI',
                        type: 'youtube',
                        id: 'XgoAVRdj1HI',
                        disableTiming: false
                    },
                    {
                        duration: 93,
                        title: 'Саигэцу',
                        thumbnail: 'https://i.ytimg.com/vi/nPQ2K1qmUoY/default.jpg',
                        url: 'https://www.youtube.com/watch?v=nPQ2K1qmUoY',
                        type: 'youtube',
                        id: 'nPQ2K1qmUoY',
                        disableTiming: false
                    }
                ]).to.deep.equal(entities);
                done();
            }).catch(reason => expect(reason).to.be(null));
        });
    });
});