import 'dotenv/config.js';
import { gameRandom, getRandom, randomChoice } from './game.js';
import { InstallGlobalCommands } from './utils.js';

// const SELECT_RANDOM = {
//   name: 'random',
//   type: 1,
//   description: 'Renerate random legend from all',
//   options: [
//     {
//       type: 3,
//       name: 'type',
//       description: 'All or favorite',
//       choices: [{value: 'All'}, {value: 'Favorite'}],
//       required: false,
//     }
//   ],
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// }



// NEW
// // Wiki command for game lookup
// const WIKI_COMMAND = {
//   name: 'wiki',
//   type: 1,
//   description: 'Renerate random legend from all',
//   options: [
//     {
//       type: 3,
//       name: 'type',
//       description: 'All or favorite',
//       choices: [{value: 'All'}, {value: 'Favorite'}],
//       required: false,
//     },
//   ],
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// };

const WIKI_COMMAND = {
  name: '',
  type: 1,
  description: 'Lookup information in wiki',
  options: [
    {
      type: 3,
      name: 'item',
      description: 'Item to lookup',
      choices: randomChoice,
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


// Leaderboard command, for guild install only
const LEADERBOARD_COMMAND = {
  name: 'leaderboard',
  type: 1,
  description: 'See server leaderboard',
  integration_types: [0],
  contexts: [0],
};

// Profile command
const PROFILE_COMMAND = {
  name: 'profile',
  type: 1,
  description: 'See your favorited legends',
  integration_types: [1],
  contexts: [0, 1, 2],
};

// Link account command
const LINK_COMMAND = {
  name: 'link',
  type: 1,
  description: 'Link your Quests of Wumpus account with your Discord profile',
  integration_types: [1],
  contexts: [1],
};

const ALL_COMMANDS = [
  WIKI_COMMAND,
  LEADERBOARD_COMMAND,
  PROFILE_COMMAND,
  LINK_COMMAND,
  // SELECT_RANDOM
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
