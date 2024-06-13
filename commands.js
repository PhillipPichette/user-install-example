import 'dotenv/config.js';
import { gameRandom, getRandom, randomChoice } from './game.js';
import { InstallGlobalCommands } from './utils.js';

const RANDOM_COMMAND = {
  name: 'random',
  type: 1,
  description: 'Renerate random legend',
  options: [
    {
      type: 3,
      name: 'type',
      description: 'All or favorite',
      choices: randomChoice,
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Profile command
const PROFILE_COMMAND = {
  name: 'profile',
  type: 1,
  description: 'See your favorited legends',
  integration_types: [1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [
  RANDOM_COMMAND,
  PROFILE_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
