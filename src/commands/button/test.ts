import { CommandButton } from '@Types/DiscordCommand'

const AcceptFeedbackSupport: CommandButton = {
  customId: 'test-{{id}}',
  execute: async (_client, _int, custom) => {
    const { id } = custom

    console.log(id);
    
    
  },
}

export default AcceptFeedbackSupport
