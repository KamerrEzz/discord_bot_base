import { Message } from 'discord.js'
import { DiscordClient } from '@Client/Discord'

class DoscordMessageManeger {
  async diarioWrite(_client: DiscordClient, _message: Message): Promise<void> {
    console.log('diarioWrite');
    
  }
}

export { DoscordMessageManeger }
