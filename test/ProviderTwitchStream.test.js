const ProviderTwitchStream = require('../lib/ProviderTwitchStream');
const EntityTwitchStream = require('../lib/EntityTwitchStream');

const expect = require('chai').expect;

describe('ProviderTwitchStream', () => {
    const twitch = new ProviderTwitchStream({key: 'ikvwvcz0xv1bby8aq0asm24vqckidn'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('ster').to.equal(twitch.id('https://twitch.tv/ster'));
        });

        it('should return id if it\'s already separated from url', () => {
            expect('ster').to.equal(twitch.id('ster'));
        });
    });

    describe('info', () => {
        it('should return Stream info', (done) => {
            twitch.info('kotborealis').then(entity => {
                expect({
                    duration: null,
                    title: '[Next Car Game Free Technology Demo] KotBorealis',
                    thumbnail: null,
                    url: 'https://www.twitch.tv/kotborealis',
                    type: 'twitch-stream',
                    id: 'kotborealis',
                    disableTiming: true
                }).to.deep.equal(entity);
                done();
            }).catch(reason => {
                throw new Error(reason);
            });
        });
    });
});