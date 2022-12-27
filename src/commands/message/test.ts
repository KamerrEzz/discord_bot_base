import { CommandMessage } from '@Types/DiscordCommand'

const ping: CommandMessage = {
  name: 'test',
  description: 'test!',
  execute: async (_client, message, _args) => {
    message.channel.send('test')
  }
}

export default ping
