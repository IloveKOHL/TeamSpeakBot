import { TeamSpeak } from 'ts3-nodejs-library';
import { ClientConnect } from 'ts3-nodejs-library/lib/types/Events';
import { ServerEdit } from 'ts3-nodejs-library/lib/types/PropertyTypes';
const components = require('./../components.json');
const config = require('./../../config.json');

export const clientjoin = (
  clientEvent: ClientConnect,
  teamspeak: TeamSpeak
) => {
  let client = clientEvent.client;

  if (
    !client.servergroups.includes(components.verify.verifyRangID.toString())
  ) {
    client.message(
      `
      ${config.welcomeMessage}
  
      Um dich zu verifizieren, benutze den Befehl:
      !verify
      `
    );
  } else {
    client.message(config.welcomeMessage);
  }
};
