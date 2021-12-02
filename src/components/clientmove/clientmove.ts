import { TeamSpeak, TeamSpeakClient } from 'ts3-nodejs-library';
import { ClientMoved } from 'ts3-nodejs-library/lib/types/Events';
import { ChannelEdit } from 'ts3-nodejs-library/lib/types/PropertyTypes';
const components = require('./../components.json');
const config = require('./../../config.json');

export const clientmove = (clientEvent: ClientMoved, teamspeak: TeamSpeak) => {
  const channel = clientEvent.channel;
  const client = clientEvent.client;

  // Is Module enabled?
  if (components.support.enable) {
    if (
      // Is client in support channel?
      channel.cid.toString() ===
      components.support.supportWarteRaumChannelID.toString()
    ) {
      // Create Support Channel
      teamspeak
        .channelCreate('Support - ' + client.nickname.slice(0, 28), {
          channelName: 'Support von ' + client.nickname,
          channelTopic: 'Support von ' + client.nickname,
          channelDescription: createSupportDesciption(client),
          channelFlagMaxclientsUnlimited: false,
          channelMaxclients: 1,
        })
        .then((newSupportChannel) => {
          // Move Client in Support Channel
          client.move(newSupportChannel.cid);
          newSupportChannel.message(
            '[b]Du wurdest in den Supportraum verschoben. Ein Support wird gleich für dich da sein.[/b]'
          );
          // Query Leaves Channel
          teamspeak.whoami().then((whoami) => {
            teamspeak.clientMove(whoami.clientId, config.standartChannelID);
          });

          // Send Support Message
          teamspeak.getServerGroupById(config.supportRoleID).then((group) => {
            group.clientList().then((clients) => {
              clients.forEach((supporters) => {
                teamspeak
                  .getClientByUid(supporters.clientUniqueIdentifier)
                  .then((supporter) => {
                    supporter.message(`${client.getUrl()} ist im Supportraum.`);
                  });
              });
            });
          });
        });
    }
  }
};

function createSupportDesciption(client: TeamSpeakClient) {
  return `
  [center]
  [size=16][url=${config.serverURL}]${config.serverName}[/url] [/size]
  [b]
  [size=14]Support von 
  ${client.nickname}[/size]
  [/b]
  [b][size=12]Bitte beachte die Support Regeln[/size][/b][/center]
  `;
}
