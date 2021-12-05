import { TeamSpeak } from 'ts3-nodejs-library';
const components = require('./../components.json');

export const ClientCount = function (teamspeak: TeamSpeak) {
  if (components.clientCount.enable) {
    teamspeak.clientList().then((clients) => {
      const clientCount = clients.length - 1;
      teamspeak
        .getChannelById(components.clientCount.channelID.toString())
        .then((channel) => {
          channel.edit({
            channelName: `[cspacer1]Clients online ${clientCount}`,
          });
        });
    });
  }
};
