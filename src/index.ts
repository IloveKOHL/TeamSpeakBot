import {
  TeamSpeak,
  QueryProtocol,
  TextMessageTargetMode,
} from 'ts3-nodejs-library';

const config = require('./config.json');

//Import Components
import { clientmove } from './components/clientmove/clientmove';
import { clientjoin } from './components/clientjoin/clientjoin';
import { verify } from './components/textmessage/verify';
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
    teamspeak.on('textmessage', (msg) => {
      if (msg.targetmode === TextMessageTargetMode.CLIENT) {
        verify(msg, teamspeak);
      }
    });
  })
  .catch((e) => {
    console.log('Catched an error!');
    console.error(e);
  });
