import 'dotenv/config'
import './paths'
import { DiscordClient } from '@Client/Discord'
import { DiscordClientOpts, DiscordKeys } from '@Config/DiscordOptions'

const client = new DiscordClient(DiscordClientOpts)

client.login(DiscordKeys.DISCORD_TOKEN)

process.on('unhandledRejection', (error: any) => {
  console.log('Unhandled Rejection at:', error.stack || error);
  client.logger('UnhandledRejection', 'info', error.message)
})
