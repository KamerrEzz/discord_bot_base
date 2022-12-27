import { Command, CommandOption } from '@Types/DiscordCommand'
import { ChatInputCommandInteraction } from 'discord.js'
import { DiscordClient } from '@Client/Discord'

class DiscordComman {
  type: number
  name: string
  description: string
  name_localizations: { [key: string]: string } | undefined
  description_localizations: { [key: string]: string } | undefined
  options: CommandOption[] | undefined

  constructor (opts: Command) {
    this.type = opts.type
    this.name = opts.name
    this.name_localizations = opts.name_localizations
    this.description = opts.description
    this.description_localizations = opts.description_localizations
    this.options = opts.options
  }

  execute (
    _client: DiscordClient,
    _int: ChatInputCommandInteraction,
    _custom?: Object | string[]
  ) {}

  build () {
    return {
      type: this.type,
      name: this.name,
      name_localizations: this.name_localizations,
      description: this.description,
      description_localizations: this.description_localizations,
      options: this.options
    }
  }

  static get option_types () {
    return {
      SUB_COMMAND: 1,
      SUB_COMMAND_GROUP: 2,
      STRING: 3, // eslint-disable-line sort-keys
      INTEGER: 4, // eslint-disable-line sort-keys
      BOOLEAN: 5, // eslint-disable-line sort-keys
      USER: 6,
      CHANNEL: 7, // eslint-disable-line sort-keys
      ROLE: 8,
      MENTIONABLE: 9, // eslint-disable-line sort-keys
      NUMBER: 10
    }
  }
}

export { DiscordComman }
