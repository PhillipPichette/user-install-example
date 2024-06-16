import 'dotenv/config.js';
import {weaponChoice } from './game.js';
import { InstallGlobalCommands } from './utils.js';

const HELP_COMMAND = {
  name: 'help',
  type: 1,
  description: 'Get a list of commands',

  integration_types: [0, 1],
  contexts: [0, 1, 2],
}

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
const FAVORITES_COMMAND = {
  name: 'favorites',
  type: 1,
  description: 'See your favorited legends',

  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ADD_FAV_COMMAND = {
  name: 'addfavorite',
  type: 1,
  description: 'Add a legend to your favorites',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Legend name',
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2]
}

const RM_FAV_COMMAND = {
  name: 'removefavorite',
  type: 1,
  description: 'Remove a legend from your favorites',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Legend name',
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2]
}

const RANDOM_FAV_COMMAND = {
  name: 'randomfav',
  type: 1,
  description: 'Get random legend from favorites',

  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [
  HELP_COMMAND,
  RANDOM_COMMAND,
  RANDOM_WEAP_COMMAND,
  FAVORITES_COMMAND,
  ADD_FAV_COMMAND,
  RM_FAV_COMMAND,
  RANDOM_FAV_COMMAND,
  
];

// @ts-ignore
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
