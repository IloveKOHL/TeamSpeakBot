import { TeamSpeak } from 'ts3-nodejs-library';
import { TextMessage } from 'ts3-nodejs-library/lib/types/Events';
const components = require('./../components');

export const verify = function (msg: TextMessage, teamspeak: TeamSpeak) {
  if (msg.msg.toLowerCase().startsWith('!verify')) {
    if (
      msg.invoker.servergroups.includes(
        components.verify.verifyRangID.toString()
      )
    ) {
      msg.invoker.message('Du bist bereits verifiziert!');
    } else {
      msg.invoker.message('Du hast dich erfolgreich verifiziert!');
      msg.invoker.addGroups(components.verify.verifyRangID);
    }
  }
};
