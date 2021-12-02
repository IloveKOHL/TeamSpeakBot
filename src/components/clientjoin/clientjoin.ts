import { TeamSpeak } from 'ts3-nodejs-library';
import { ClientConnect } from 'ts3-nodejs-library/lib/types/Events';
const components = require('./../components.json');
const config = require('./../../config.json');

export const clientjoin = (
  clientEvent: ClientConnect,
  teamspeak: TeamSpeak
) => {
  let client = clientEvent.client;

  client.message(config.welcomeMessage);
};
