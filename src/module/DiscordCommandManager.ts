import { DiscordClient } from '@Client/Discord'
import { ChatInputCommandInteraction } from 'discord.js'

class DiscordCommandManger {
  slashCommand (
    client: DiscordClient,
    interaction: ChatInputCommandInteraction
  ) {
    const parseOptions = JSON.parse(JSON.stringify(interaction.options))
    const isSubCommand = parseOptions._subcommand
    const command = client.slashCommands.get(interaction.commandName)

    try {
      if (isSubCommand) {
        const subCommandClass = client.subCommands.get(
          `${interaction.commandName}.${interaction.options.getSubcommand()}`
        )
        if (subCommandClass != null) {
          return subCommandClass.execute(client, interaction)
        } else {
          return interaction.reply({
            content: 'No se ha encontrado el comando',
            ephemeral: true
          })
        }
      }
      if (command != null) return command.execute(client, interaction)
    } catch (error: any) {
      client.logger(
        'DiscordCommandManger-slashCommand',
        'error',
        error.message
      )
      return interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    }
  }

  buttonCommand (client: DiscordClient, interaction: any) {
    const customId: string[] = interaction.customId.split('-')

    // search for the command
    const button = client.buttons.get(interaction.customId)
    // find the command that includes the word
    const buttonWithCustom = client.buttons.find((buttons: any) => {
      return buttons.customId.includes(customId[0])
    })

    let customs: Object = {}

    if (buttonWithCustom != null) {
      // @ts-expect-error
      customs = buttonWithCustom.customId.split('-').reduce((acc, cur, i) => {
        if (cur.includes('{{') && cur.includes('}}')) {
          const key = cur.replace('{{', '').replace('}}', '')
          acc[key] = customId[i]
        }
        return acc
      }, {})
    }

    try {
      if (button != null) return button.execute(client, interaction)
      if (buttonWithCustom != null) {
        return buttonWithCustom.execute(client, interaction, customs)
      }
      // else
      //   return interaction.reply({
      //     content: 'Este boton ya no existe!',
      //     ephemeral: true,
      //   })
    } catch (error: any) {
      client.logger(
        'DiscordCommandManger-buttonCommand',
        'error',
        error.message
      )
      return interaction.reply({
        content: 'Ha ocurrido un error, contacta a un admin!',
        ephemeral: true
      })
    }
  }

  modalCommand (client: DiscordClient, interaction: any) {
    const customId: string[] = interaction.customId.split('-')

    const modal = client.modals.get(interaction.customId)
    const modalWithCustom = client.modals.find((modals: any) => {
      return modals.customId.includes(customId[0])
    })

    let customs: Object = {}

    if (modalWithCustom != null) {
      // @ts-expect-error
      customs = modalWithCustom.customId.split('-').reduce((acc, cur, i) => {
        if (cur.includes('{{') && cur.includes('}}')) {
          const key = cur.replace('{{', '').replace('}}', '')
          acc[key] = customId[i]
        }
        return acc
      }, {})
    }

    try {
      if (modal != null) return modal.execute(client, interaction)
      if (modalWithCustom != null) {
        return modalWithCustom.execute(client, interaction, customs)
      } else {
        return interaction.reply({
          content: 'Este modal ya no existe',
          ephemeral: true
        })
      }
    } catch (error: any) {
      client.logger(
        'DiscordCommandManger-modalCommand',
        'error',
        error.message
      )
      return interaction.reply({
        content: 'Ha ocurrido un error, contacta a un admin!',
        ephemeral: true
      })
    }
  }

  selectMenuCommand (client: DiscordClient, interaction: any) {
    const customId: string[] = interaction.customId.split('-')

    const modal = client.menus.get(interaction.customId[0])
    const modalWithCustom = client.menus.find((modals: any) => {
      return modals.customId.includes(customId[0])
    })

    let customs: Object = {}

    if (modalWithCustom != null) {
      // @ts-expect-error
      customs = modalWithCustom.customId.split('-').reduce((acc, cur, i) => {
        if (cur.includes('{{') && cur.includes('}}')) {
          const key = cur.replace('{{', '').replace('}}', '')
          acc[key] = customId[i]
        }
        return acc
      }, {})
    }

    try {
      if (modal != null) return modal.execute(client, interaction)
      if (modalWithCustom != null) { return modalWithCustom.execute(client, interaction, customs) }
      // else
      //   return interaction.reply({
      //     content: 'Este menu ya no existe',
      //     ephemeral: true,
      //   })
    } catch (error: any) {
      client.logger(
        'DiscordCommandManger-modalCommand',
        'error',
        error.message
      )
      return interaction.reply({
        content: 'Ha ocurrido un error, contacta a un admin!',
        ephemeral: true
      })
    }
  }
}

export default DiscordCommandManger
