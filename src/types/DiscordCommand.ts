import {
  CommandInteraction,
  Message,
  ModalSubmitInteraction,
  ChatInputCommandInteraction,
} from 'discord.js'
import { DiscordClient } from '@Client/Discord'

interface CommandChoice {
  name: string
  name_localizations?: { [key: string]: string }
  value: string
}

interface CommandOption {
  type: number
  name: string
  name_localizations?: { [key: string]: string }
  description: string
  description_localizations?: { [key: string]: string }
  required?: boolean
  choices?: CommandChoice[]
  options?: CommandOption[]
  channel_types?: string[]
  min_value?: number
  max_value?: number
  min_length?: number
  max_length?: number
  autocomplete?: boolean
}

// ApplicationCommandType
//
//   SUB_COMMAND: 1,
//   SUB_COMMAND_GROUP: 2,
//   STRING: 3, // eslint-disable-line sort-keys
//   INTEGER: 4, // eslint-disable-line sort-keys
//   BOOLEAN: 5, // eslint-disable-line sort-keys
//   USER: 6,
//   CHANNEL: 7, // eslint-disable-line sort-keys
//   ROLE: 8,
//   MENTIONABLE: 9, // eslint-disable-line sort-keys
//   NUMBER: 10,
//

type ApplicationCommandType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface Command {
  type: number
  name: string
  name_localizations?: { [key: string]: string }
  description: string
  description_localizations?: { [key: string]: string }
  default_member_permissions?: string[]
  dm_permission?: boolean
  options?: CommandOption[]
  execute?: (client: DiscordClient, int: CommandInteraction) => Promise<void>
}

interface SubCommand {
  subcommand: string
  execute: (
    client: DiscordClient,
    int: ChatInputCommandInteraction
  ) => Promise<void>
}

interface CommandMessage {
  name: string
  description: string
  usage?: string
  execute: (
    client: DiscordClient,
    message: Message,
    args: string[]
  ) => Promise<void>
}

interface ButtonCustom {
  discord?: string
  thread?: string
  id?: string
}

interface CommandButton {
  customId: string
  execute: (
    client: DiscordClient,
    int: ChatInputCommandInteraction,
    custom: ButtonCustom
  ) => Promise<void>
}

interface CommandModal {
  customId: string
  execute: (
    client: DiscordClient,
    int: ModalSubmitInteraction,
    custom: string
  ) => Promise<void>
}

export {
  Command,
  SubCommand,
  CommandOption,
  CommandChoice,
  CommandModal,
  ApplicationCommandType,
  CommandMessage,
  CommandButton,
}
