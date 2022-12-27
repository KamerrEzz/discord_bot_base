import DiscordEvent from '@Types/DiscordEvent'
import { DiscordKeys } from '@Config/DiscordOptions'
import { DoscordMessageManeger } from '@Module/DoscordMessageManeger'
const discordmessagemanager = new DoscordMessageManeger()

const messageCreate: DiscordEvent = {
  name: 'messageCreate',
  once: false,
  execute: async (client, message) => {
    discordmessagemanager.diarioWrite(client, message)

    if (message.author.bot) return
    if (!message.content.startsWith(DiscordKeys.DISCORD_PREFIX)) return
    const args = message.content
      .slice(DiscordKeys.DISCORD_PREFIX.length)
      .trim()
      .split(/ +/)

    const commandName = args.shift()?.toLowerCase()
    if (!commandName) return

    const command = client.MessageCommand.get(commandName)
    if (!command) return
    try {
      command.execute(client, message, args)
    } catch (error) {
      console.error(error)
      message.reply('There was an error trying to execute that command!')
    }
  }
}

export default messageCreate
