import DiscordEvent from '@Types/DiscordEvent'

const ready: DiscordEvent = {
  name: 'ready',
  once: true,
  execute: async (client) => {
    client.logger(
      'DiscordEvent-ready',
      'info',
      `Logged in as ${client?.user?.tag}!`
    )
    client.publishCommands()
  }
}

export default ready
