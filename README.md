# sync-lc-providers
Node.JS library to fetch info from Yo');
/**
  Returns promise with video info:
  
**/utube, Soundcloud and etc.

## Supported providers
* Coub
* Soundcloud
* Vimeo
* Twitch Streams
* Youtube (including playlists)
* Video/audio files

## Usage

```js
const providers = require('sync-lc-providers');

// Get single video info
providers.youtube.info('https://www.youtube.com/watch?v=iNCRfh6dx60').then(info => ...).catch(error => ...);
/**
  Returns promise with video info:
  {
      duration: 195,
      title: 'ChunnHEbyou',
      thumbnail: 'https://i.ytimg.com/vi/iNCRfh6dx60/default.jpg',
      url: 'https://www.youtube.com/watch?v=iNCRfh6dx60',
      type: 'youtube',
      id: 'iNCRfh6dx60',
      disableTiming: false
  }
  
  If there's any errors, rejects the promise.
**/

// Get all videos from playlist

providers.youtubeList.entities('https://www.youtube.com/playlist?list=PLN1mjQ-i1XV5zC72G4NyaFANSeVAIL43U').then(entities => ...).catch(error => ...);
/**
  Returns promise with array of entities in the same format as .info
**/

```
