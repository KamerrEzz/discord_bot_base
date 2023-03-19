import { CommandMenu } from '@Types/DiscordCommand'


const SelectMenu: CommandMenu = {
  customId: 'tp-topics-{{thread}}',
  execute: async (_client, int, custom) => {
    const { thread } = custom

    await int.reply({ 
      content: 'Topics agregados correctamente al hilo <#' + thread + '>',
      ephemeral: true })
  },    
}

export default SelectMenu
