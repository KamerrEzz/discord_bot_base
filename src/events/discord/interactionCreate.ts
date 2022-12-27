import DiscordEvent from '@Types/DiscordEvent'
import DiscordCommandManger from '@Module/DiscordCommandManager'
const DiscordCommandManager = new DiscordCommandManger()

const interactionCreate: DiscordEvent = {
  name: 'interactionCreate',
  once: false,
  execute: async (client, interaction) => {
    if (interaction.isCommand()) {
      return DiscordCommandManager.slashCommand(client, interaction)
    }

    if (interaction.isButton()) {
      return DiscordCommandManager.buttonCommand(client, interaction)
    }

    if (interaction.isModalSubmit()) {
      return DiscordCommandManager.modalCommand(client, interaction)
    }
  },
}

export default interactionCreate
