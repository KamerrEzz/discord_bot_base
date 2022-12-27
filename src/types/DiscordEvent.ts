import { DiscordClient } from '@Client/Discord'

interface Event {
  name: string
  once?: boolean
  execute: (client: DiscordClient, ...args: any[]) => Promise<void>
}

export default Event
