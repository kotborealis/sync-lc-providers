const ProviderYoutube = require('../lib/ProviderYoutube');
const EntityYoutube = require('../lib/EntityYoutube');

const expect = require('chai').expect;

describe('ProviderYoutube', () => {
    const youtube = new ProviderYoutube({key: 'AIzaSyDpRpBquRTLhmifkJdNM78QgqjD0SDpkIM'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://www.youtube.com/watch?v=dBbQMXuFM9w'));
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://www.youtube.com/watch?v=dBbQMXuFM9w&index=58&list=PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
            expect('dBbQMXuFM9w').to.equal(youtube.id('https://youtu.be/dBbQMXuFM9w?list=PLXoCDa_TqvTRPiH45mThc-5wOzL7I0xQm'));
            expect('E-68IxmGaoA').to.equal(youtube.id('https://youtu.be/E-68IxmGaoA'));
        });

        it('should return id if it\'s already separated from url', () => {
            expect('dBbQMXuFM9w').to.equal(youtube.id('dBbQMXuFM9w'));
            expect('iNCRfh6dx60').to.equal(youtube.id('iNCRfh6dx60'));
        });
    });

    describe('info', () => {
        it('should return promise with video info', (done) => {
            youtube.info('iNCRfh6dx60').then(entity => {
                expect({
                    duration: 195,
                    title: 'ChunnHEbyou',
                    thumbnail: 'https://i.ytimg.com/vi/iNCRfh6dx60/default.jpg',
                    url: 'https://www.youtube.com/watch?v=iNCRfh6dx60',
                    type: 'youtube',
                    id: 'iNCRfh6dx60'
                }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                done();
                throw new Error(reason);
            });
        });


        it('should reject non-existing videos', (done) => {
            youtube.info('asswecan').then(entity => {
                done();
            }).catch(reason => {
                expect("Not Found").to.equal(reason);
                done();
            });
        });

        it('should reject non-embeddable videos', (done) => {
            youtube.info('https://youtu.be/E-68IxmGaoA').then(entity => {
                done();
            }).catch(reason => {
                expect("Not Embeddable").to.equal(reason);
                done();
            });
        });
    });

    describe('entities', () => {
        it('should return promise with video info', (done) => {
            youtube.entities('iNCRfh6dx60').then(entity => {
                expect({
                    duration: 195,
                    title: 'ChunnHEbyou',
                    thumbnail: 'https://i.ytimg.com/vi/iNCRfh6dx60/default.jpg',
                    url: 'https://www.youtube.com/watch?v=iNCRfh6dx60',
                    type: 'youtube',
                    id: 'iNCRfh6dx60'
                }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                done();
                throw new Error(reason);
            });
        });


        it('should reject non-existing videos', (done) => {
            youtube.entities('asswecan').then(entity => {
                done();
            }).catch(reason => {
                expect("Not Found").to.equal(reason);
                done();
            });
        });

        it('should reject non-embeddable videos', (done) => {
            youtube.entities('https://youtu.be/E-68IxmGaoA').then(entity => {
                done();
            }).catch(reason => {
                expect("Not Embeddable").to.equal(reason);
                done();
            });
        });
    });
});