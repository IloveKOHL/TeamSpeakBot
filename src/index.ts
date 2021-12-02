import {
  TeamSpeak,
  QueryProtocol,
  TextMessageTargetMode,
} from 'ts3-nodejs-library';

const config = require('./config.json');

//Import Components
import { clientmove } from './components/clientmove/clientmove';
import { clientjoin } from './components/clientjoin/clientjoin';
import { ChannelTypes } from 'discord.js/typings/enums';

TeamSpeak.connect({
  host: config.host,
  protocol: QueryProtocol.RAW,
  queryport: 10011,
  serverport: config.serverport,
  username: config.username,
  password: config.password,
  nickname: config.nickname,
})
  .then(async (teamspeak) => {
    console.log('Connected to TeamSpeak');

    teamspeak.on('clientmoved', (client) => {
      clientmove(client, teamspeak);
    });
    teamspeak.on('clientconnect', (client) => {
      clientjoin(client, teamspeak);
    });
  })
  .catch((e) => {
    console.log('Catched an error!');
    console.error(e);
  });
