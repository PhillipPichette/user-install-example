import 'dotenv/config.js';
import { gameRandom, getRandom, weaponChoice } from './game.js';
import { InstallGlobalCommands } from './utils.js';

const RANDOM_COMMAND = {
  name: 'random',
  type: 1,
  description: 'Get random legend',

  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const RANDOM_WEAP_COMMAND = {
  name: 'randomweap',
  type: 1,
  description: 'Get random legend from chosen weapon',
  options: [
    {
      type: 3,
      name: 'type',
      description: 'Weapon',
      choices: weaponChoice,
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
  RANDOM_WEAP_COMMAND,
  PROFILE_COMMAND,
];

// @ts-ignore
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
