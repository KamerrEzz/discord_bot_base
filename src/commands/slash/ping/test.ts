import { SubCommand } from '@Types/DiscordCommand'

const PingTest: SubCommand = {
  subcommand: 'ping.test',
  execute: async (_client, int) => {
    await int.reply('Pong!')
  },
}

export default PingTest
