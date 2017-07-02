const ProviderVimeo = require('../lib/providers/ProviderVimeo');
const EntityVimeo = require('../lib/entities/EntityVimeo');

const expect = require('chai').expect;

describe('ProviderVimeo', () => {
    const Vimeo = new ProviderVimeo();

    describe('id', () => {
        it('should parse id from url', () => {
            expect('115495563').to.equal(Vimeo.id('https://vimeo.com/115495563'));
        });

        it('should return id if it\'s already separated from url', () => {
            expect('115495563').to.equal(Vimeo.id('115495563'));
        });
    });

    describe('info', () => {
        it('should return video info', (done) => {
            Vimeo.info('115495563').then(entity => {
                console.log(entity);
                expect({
                    duration: 230,
                    title: '[MAD] JoJo\'s Bizarre Adventure - Part 4 - Diamond is Unbreakable',
                    thumbnail: 'https://i.vimeocdn.com/video/501535009_120x90.jpg',
                    url: 'https://vimeo.com/115495563',
                    type: 'vimeo',
                    disableTiming: false,
                    id: '115495563'
                }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});