import { DiscordComman } from '@Module/DiscordCommands'
import { ChatInputCommandInteraction } from 'discord.js'

class Ping extends DiscordComman {
  constructor () {
    super({
      type: DiscordComman.option_types.SUB_COMMAND,
      name: 'ping',
      description: 'Pong!',
      options: [
        {
          type: DiscordComman.option_types.SUB_COMMAND,
          name: 'test',
          description: 'test test test test test'
        }
      ]
    })
  }

  async execute (_client: any, int: ChatInputCommandInteraction) {
    await int.reply('Pong!')
  }
}

export default Ping
