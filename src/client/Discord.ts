import { Client, ClientOptions, Collection } from 'discord.js'
import { LoadFiles } from '@Utils/loadFiles'
import { Logger } from '@Utils/Logger'
import { Logger as Log } from '@Types/Logger'
import { DiscordComman } from '@Module/DiscordCommands'
import path from 'path'
import { DiscordKeys } from '@Config/DiscordOptions'
import { MODE_DEV } from '@Config/Project'

export class DiscordClient extends Client {
  public supabase: any
  public logger: Log
  DiscordComman: typeof DiscordComman
  slashCommands: Collection<string, DiscordComman>
  subCommands: Collection<string, DiscordComman>
  buttons: Collection<string, DiscordComman>
  modals: Collection<string, DiscordComman>
  MessageCommand: Collection<any, any>

  constructor (opts: ClientOptions) {
    super(opts)

    this.logger = Logger
    this.DiscordComman = DiscordComman
    this.slashCommands = new Collection()
    this.subCommands = new Collection()
    this.buttons = new Collection()
    this.modals = new Collection()
    this.MessageCommand = new Collection()
    this.loadEvents()
    this.loadCommands()
    this.logger('DiscordClient', 'info', 'Discord client loaded')
    this.logger('Mode', 'warn', 'Enviroment: ' + (MODE_DEV ? 'Development' : 'Production'))
  }

  loadEvents () {
    LoadFiles(`${MODE_DEV ? 'src' : 'dist'}/events/discord`, `${MODE_DEV ? 'ts' : 'js'}`).then((files) => {
      files.forEach((file) => {
        const dir = path.resolve(file)
        const event = require(dir).default
        this.logger('loadEvents', 'info', `Loaded event ${event.name}`)
        this.on(event.name, (...args) => event.execute(this, ...args))
      })
    })
  }

  async loadCommands () {
    const files = await LoadFiles(`${MODE_DEV ? 'src' : 'dist'}/commands/slash`, `${MODE_DEV ? 'ts' : 'js'}`)
    files.forEach((file) => {
      const dir = path.resolve(file)
      const commandDir = require(dir).default
      if (commandDir.subcommand) {
        this.subCommands.set(commandDir.subcommand, commandDir)
        this.logger(
          'LoadCommandsSub',
          'info',
          `Loaded Slash subcommand ${commandDir.subcommand}`
        )
      } else {
        const command = new commandDir()
        this.slashCommands.set(command.name, command)
        this.logger(
          'LoadCommands',
          'info',
          `Loaded Slash command ${command.name}`
        )
      }
    })

    const messageFiles = await LoadFiles(`${MODE_DEV ? 'src' : 'dist'}/commands/message`, `${MODE_DEV ? 'ts' : 'js'}`)
    messageFiles.forEach((file) => {
      const dir = path.resolve(file)
      const command = require(dir).default
      this.MessageCommand.set(command.name.toLowerCase(), command)
      this.logger('LoadCommandsMsg', 'info', `Loaded command ${command.name}`)
    })

    const buttonFiles = await LoadFiles(`${MODE_DEV ? 'src' : 'dist'}/commands/button`, `${MODE_DEV ? 'ts' : 'js'}`)
    buttonFiles.forEach((file) => {
      const dir = path.resolve(file)
      const button = require(dir).default
      this.buttons.set(button.customId, button)
      this.logger(
        'LoadCommandsBTN',
        'info',
        `Loaded button ${button.customId}`
      )
    })

    const modalFiles = await LoadFiles(`${MODE_DEV ? 'src' : 'dist'}/commands/modal`, `${MODE_DEV ? 'ts' : 'js'}`)
    modalFiles.forEach((file) => {
      const dir = path.resolve(file)
      const modal = require(dir).default
      this.modals.set(modal.customId, modal)
      this.logger('LoadCommandsMOD', 'info', `Loaded modal ${modal.customId}`)
    })
  }

  async publishCommands () {
    try {
      const commands = this.slashCommands.map((command) => command.build())
      await this.application?.commands.set(commands, DiscordKeys.DISCORD_GUILD_ID as string)
      this.logger(
        'publishCommands',
        'info',
        `Published ${commands.length} commands`
      )
    } catch (error: any) {
      console.log(error)
      this.logger('publishCommands', 'error', `${error.stack}`)
    }
  }
}
