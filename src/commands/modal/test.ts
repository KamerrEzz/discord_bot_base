import { CommandModal } from '@Types/DiscordCommand'

const solicitudMod: CommandModal = {
  customId: 'test',
  execute: async (_client, int, _custom) => {
    const description = int.fields.getTextInputValue('description')
    console.log(description);
    
  },
}

export default solicitudMod
