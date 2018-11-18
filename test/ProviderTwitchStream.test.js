const ProviderTwitchStream = require('../lib/providers/ProviderTwitchStream');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderTwitchStream', () => {
    before(() => require('../lib/request_fixture').__fake = true);
    after(() => require('../lib/request_fixture').__fake = false);

    const twitch = new ProviderTwitchStream({key: 'ikvwvcz0xv1bby8aq0asm24vqckidn'});

    describe('id', () => {
        it('should parse id from url', () => {
            expect('ster').to.equal(twitch.id('https://twitch.tv/ster'));
        });

        it('should not parse other urls', () => {
            expect(twitch.id('https://www.youtube.com/watch?v=bWieT70WK5U&index=9&list=FL2vJnHZG1z5gOynC2pY7TFQ')).to.be.equal(null);
        });
    });

    describe('info', () => {
        it('should return Stream info', async () => {
            const entity = await twitch.info('http://twitch.tv/kotborealis');
            expect({
                duration: null,
                title: '[Next Car Game Free Technology Demo] KotBorealis',
                thumbnail: null,
                url: 'https://www.twitch.tv/kotborealis',
                type: 'twitchStream',
                id: 'kotborealis',
                disableTiming: true
            }).to.deep.equal(entity);
        });
    });
});