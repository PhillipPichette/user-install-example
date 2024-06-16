import 'dotenv/config';
import { verifyKey } from 'discord-interactions';
import { getLegends, getProfileByName, getUsername } from './game.js';

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent':
        'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;
  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

export function capitalize(str) {
  str = str.toLowerCase()

  var words = str.split(' ')
  words.forEach((word, idx) => {
    if (word.length > 0) {
      // Capitalize the first letter and add the rest of the word
      words[idx] = word[0].toUpperCase() + word.slice(1);
    }
  })
  return words.join(' ')
  // return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getServerMembers(guildId, limit) {
  const endpoint = `guilds/${guildId}/members?limit=${limit}`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const parsedRes = await res.json();
    return parsedRes.map((member) => member.user.id);
  } catch (err) {
    return console.error(err);
  }
}

export function createPlayerEmbed(user) {
  const player = getProfileByName(user.global_name)
  return {
    type: 'rich',
    title: `${user.global_name}'s Favorites`,
    color: 0x968b9f,
    fields: player.favorites,
    thumbnail: {
      // url: 'https://raw.githubusercontent.com/shaydewael/example-app/main/assets/fake-icon.png',
      url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    },
  };
}

export function createGeneratedLegend(legend){
  
  const val = {
    type: 'rich',
    title: `${legend.name}`,
    color: 0x968b9f,
    fields: [
      {
        name: `Weapons`,
        value: `${legend.weapons[0]}, ${legend.weapons[1]}`
      }
    ],
    thumbnail: {
      url: `https://raw.githubusercontent.com/PhillipPichette/user-install-example/main/assets/legends/${legend.img}.png`,
    },
  }
  return val
}

export function createErrorEmbed(error){
  
  const val = {
    type: 'rich',
    title: `${error.title}`,
    color: 0x968b9f,
    fields: [
      {
        name: `Message`,
        value: error.message
      }
    ],
    thumbnail: {
      url: `https://raw.githubusercontent.com/PhillipPichette/user-install-example/main/assets/error.png`,
    },
  }
  return val
}

export function createHelpEmbed(){
  return {
    type: 'rich',
    title: 'Commands',
    color: 0x968b9f,
    fields:[
      {
        name: '**/random**',
        value: `Randomly generate one of all ${getLegends().length} legends`
      },
      {
        name: '**/favorites**',
        value: `View your favorites`
      },
      {
        name: '**/addfavorite [legend]**',
        value: `Add a legend to your list of favorites`
      },
      {
        name: '**/removefavorite [legend]**',
        value: `Remove a legend from your list of favorites`
      },
      {
        name: '**/randomfav**',
        value: `Randomly generate a legend from your list of favorites`
      },
      {
        name: '**/randomweap [weapon]**',
        value: `Randomly generate a legend with the specified weapon`
      },
      {
        name: '\n**feedback**',
        value: `if you have any questions or feedback about the bot send me a dm! \n<@245032124447588362>`
      }
    ]
  }
}