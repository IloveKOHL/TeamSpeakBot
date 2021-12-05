import { TeamSpeak } from 'ts3-nodejs-library';
import { TextMessage } from 'ts3-nodejs-library/lib/types/Events';

export const adminCommands = function (
  message: TextMessage,
  teamspeak: TeamSpeak
) {
  if (message.msg.toLowerCase().startsWith('!info')) {
    var args = message.msg.split(' ');
    let ID = args[1];
    teamspeak
      .getClientByDbid(ID)
      .then((client) => {
        client.getInfo().then((info) => {
          // Create info string

          let infoString =
            '\nName: ' +
            info.clientNickname +
            '\n' +
            'ID: ' +
            info.cid +
            '\n' +
            'Total Connections: ' +
            info.clientTotalconnections +
            '\n' +
            'UID: ' +
            info.clientUniqueIdentifier +
            '\n' +
            'IP: ' +
            info.connectionClientIp +
            '\n' +
            'Version: ' +
            info.clientVersion;
          message.invoker.message(infoString);
        });
      })
      .catch((err) => {
        message.invoker.message('Der Client konnte nicht gefunden werden.');
      });
  }
};
