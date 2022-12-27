import 'dotenv/config'
import { ClientOptions, IntentsBitField, Partials } from 'discord.js'

const DiscordKeys = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_PREFIX: process.env.DISCORD_PREFIX || 's!'
}

const DiscordClientOpts: ClientOptions = {
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction
  ]
}

export { DiscordClientOpts, DiscordKeys }
