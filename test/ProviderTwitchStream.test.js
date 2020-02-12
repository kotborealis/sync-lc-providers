const ProviderTwitchStream = require('../lib/providers/ProviderTwitchStream');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ProviderTwitchStream', () => {
    const twitch = new ProviderTwitchStream({
        key: 'ikvwvcz0xv1bby8aq0asm24vqckidn',
        request: require('./mocks/request')
    });

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
            const entity = await twitch.info('https://www.twitch.tv/vansamaofficial');
            expect({
                duration: null,
                title: 'VansamaOfficial',
                thumbnail: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2a448e6c-35d7-4b46-ad31-6646c364bd02-profile_image-300x300.png',
                url: 'https://twitch.tv/vansamaofficial',
                type: 'twitchStream',
                id: 'vansamaofficial',
                disableTiming: true
            }).to.deep.equal(entity);
        });
    });
});