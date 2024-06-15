import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import {
  VerifyDiscordRequest,
  createPlayerEmbed,
  createGeneratedLegend,
  createErrorEmbed,
} from './utils.js';
import { AddFavorite, AddProfile, getProfileByName, getRandom } from './game.js';
import { ReadFromFile, WritetoFile } from './jsonIO.js';

// Create an express app
const app = express();
// Get port, or default to 3000
// @ts-ignore
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
// @ts-ignore
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
// @ts-ignore
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;
  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */


  if (type === InteractionType.APPLICATION_COMMAND) {
    
    const { name } = data;
    
    // "favorites" command
    if (name === 'favorites') {
      
      console.log('FOO')
      // Use interaction context that the interaction was triggered from
      const interactionContext = req.body.context;
      var user
      if(interactionContext !== 1) {
        user = req.body.member.user
      }else{
        user = req.body.user
      }

      const profileEmbed = createPlayerEmbed(user);



      // Construct `data` for our interaction response. The profile embed will be included regardless of interaction context
      let profilePayloadData = {
        embeds: [profileEmbed],
      };

      // Send response
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });
    }

    // "random" command
    if (name === 'randomweap') {
      
      const option = data.options[0];

      const selectedItem = getRandom('weapon', option.value);
      // Send a message into the channel where command was triggered from

      const msgEmbed = createGeneratedLegend(selectedItem)

      let profilePayloadData = {
        embeds: [msgEmbed],
      };

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });

      // return res.send({
      //   type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      //   data: {
      //     content: `# **${selectedItem.name}** \n Weapons: **${selectedItem.weapons[0]}, ${selectedItem.weapons[1]}**`,
      //   },
      // });
    }

    if (name === 'random') {
      const selectedItem = getRandom('all');
      // Send a message into the channel where command was triggered from
      
      const msgEmbed = createGeneratedLegend(selectedItem)

      let profilePayloadData = {
        embeds: [msgEmbed],
      };

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });
    }

    if (name === 'addfavorite'){
      const option = data.options[0];
      const interactionContext = req.body.context;
      var user
      if(interactionContext !== 1) {
        user = req.body.member.user
      }else{
        user = req.body.user
      }
      console.log(option)
      const error = AddFavorite(user.global_name, option.value)
      const profileEmbed = error ? createErrorEmbed(error): createPlayerEmbed(user);

      // Construct `data` for our interaction response. The profile embed will be included regardless of interaction context
      let profilePayloadData = {
        embeds: [profileEmbed],
      };

      // Send response
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });
    }

    if (name === 'removefavorite'){
      const option = data.options[0];
      const interactionContext = req.body.context;
      var user
      if(interactionContext !== 1) {
        user = req.body.member.user
      }else{
        user = req.body.user
      }
      console.log(option)
      AddFavorite(user.global_name, option.value)
      const profileEmbed = createPlayerEmbed(user);

      // Construct `data` for our interaction response. The profile embed will be included regardless of interaction context
      let profilePayloadData = {
        embeds: [profileEmbed],
      };

      // Send response
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });
    }


  }

  // handle button interaction
  if (type === InteractionType.MESSAGE_COMPONENT) {
    const profile = getProfileByName(req.body.member.user);
    const profileEmbed = createPlayerEmbed(profile);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [profileEmbed],
      },
    });
  }
});

// @ts-ignore
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
