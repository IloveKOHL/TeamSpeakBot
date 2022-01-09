# TeamSpeakBot

## Features 
### Commands
```
Command                             | Permission                    | Funktion

!verify                             | ----------                    | Verifies a user with an adjustable rank
!info <clientID>                    | highteam Role in config.json  | Gives Information about a User

```

## Setup
### 1. Download Source and go in the created Folder
```
git clone https://github.com/LukasILoveKOHL/TeamSpeakBot.git
cd TeamSpeakBot/
```
### 2. Edit Config.json and components.json
### config.json
```
nano src/config.json
```
```json
{
    "host": "localhost",
    "serverport": 9987,
    "username": "serveradmin",
    "password": "PASSWORD",
    "nickname": "NICKNAME",
    "api-key": "API-KEY",
    "standartChannelID": "1",
    "highTeamRoleID": "6",
    "serverName": "LvckyWorld",
    "serverURL": "https://lvckyworld.net",
    "welcomeMessage": "Willkommen auf LvckyWorld!"
}

```
### components.json
```
nano src/components/components.json
```
```json
{
    "support": {
        "enable": true,
        "supportParentChannelID": 61,
        "supportWarteRaumChannelID": 17,
        "supportRoleID": 10
    },
    "verify": {
        "enable": true,
        "verifyRangID": 9
    },
    "clientCount": {
        "enable": true,
        "channelID": 89
    }
}
```
3. Install packages
```
npm i
```
4. Start the Bot
```
ts-node src/index.ts
```
