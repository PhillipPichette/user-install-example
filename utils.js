import 'dotenv/config';
import { verifyKey } from 'discord-interactions';
import { getProfileByName, getUsername } from './game.js';

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    console.log(signature, timestamp, clientKey);

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
    console.log(res.status);
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
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// export async function getServerLeaderboard(guildId) {
//   let members = await getServerMembers(guildId, 3);
//   members = members
//     .map((id, i) => `${i + 1}. <@${id}> (\`${getUsername(i)}\`)`)
//     .join('\n');
//   return `## :trophy: Server Leaderboard\n*This is a very fake leaderboard that just pulls random server members. Pretend it's pulling real game data and it's much more fun* :zany_face:\n\n### This week\n${members}\n\n### All time\n${members}`;
// }

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
  // console.log( "PROFILE "+user )
  return {
    type: 'rich',
    title: `${user.global_name}'s Favorites`,
    color: 0x968b9f,
    fields: player.favorites,
    // [
    //   {
    //     name: `Favorites`,
    //     value: profile.favorites,
    //     inline: true,
    //   },
    // ],
    // url: 'https://discord.com/developers/docs/intro',
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
      // url: `https://raw.githubusercontent.com/shaydewael/example-app/main/assets/fake-icon.png`,
      url: `https://raw.githubusercontent.com/PhillipPichette/user-install-example/main/assets/legends/${legend.img}.png`,
    },
  }
  console.log(val)
  return val
}

export function genRandom(){
  return Math.floor(Math.random() * (62 - 1 + 1)) + 1;
}