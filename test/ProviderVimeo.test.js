const ProviderVimeo = require('../lib/providers/ProviderVimeo');

const expect = require('chai').expect;

describe('ProviderVimeo', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const Vimeo = new ProviderVimeo();

    describe('id', () => {
        it('should parse id from url', () => {
            expect('115495563').to.equal(Vimeo.id('https://vimeo.com/115495563'));
        });

        it('should not parse other urls', () => {
            //noinspection BadExpressionStatementJS
            expect(Vimeo.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.null;
        });
    });

    describe('info', () => {
        it('should return video info', (done) => {
            Vimeo.info('http://vimeo.com/115495563').then(entity => {
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