import {
  EmbedBuilder,
  ColorResolvable,
  WebhookClient,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ChannelType,
  BaseGuildTextChannel
} from 'discord.js'
import axios from 'axios'
import { DiscordKeys } from '@Config/DiscordOptions'
const wait = require('util').promisify(setTimeout)

const Embed = (
  title: string,
  description: string,
  color: ColorResolvable | null
) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
  return embed
}

const Webhook = (url: string): WebhookClient => {
  const webhook = new WebhookClient({ url })
  return webhook
}

const Button = (
  id: string,
  label: string,
  Style: ButtonStyle
): ButtonBuilder => {
  const button = new ButtonBuilder()
    .setCustomId(id)
    .setLabel(label)
    .setStyle(Style || ButtonStyle.Primary)
  return button
}

const SelectMenu = (
  id: string,
  label: string,
  options: [
    {
      label: string
      description: string
      value: string
    }
  ]
) => {
  const selectMenu = new SelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder(label)
    .addOptions(options)
  return selectMenu
}

const Modal = (id: string, label: string): ModalBuilder => {
  const modal = new ModalBuilder().setCustomId(id).setTitle(label)

  return modal
}

const ModelInput = (
  id: string,
  label: string,
  Style: TextInputStyle
): TextInputBuilder => {
  const input = new TextInputBuilder()
    .setCustomId(id)
    .setLabel(label)
    .setStyle(Style || TextInputStyle.Short)
  return input
}

interface optsThread {
  name: string
  channel: BaseGuildTextChannel
  type: ChannelType | number
  reason?: string
  members?: string[]
  message?: any
}

const createThread = async ({
  name,
  channel,
  type,
  reason,
  members,
  message
}: optsThread) => {
  const thread = await channel.threads
    .create({
      name,
      type,
      reason
    })
    .catch((err: any) => {
      console.log(err)
      throw new Error(err)
    })

  if (members != null) {
    members.forEach(async (member) => {
      await thread.members.add(member)
    })
  }

  if (message) {
    await thread.send(message)
  }

  return thread
}

const deleteMessageTime = async (msg: any, time: number = 5) => {
  wait(time * 1000)
    .then(() => {
      if (!msg) {
        console.log('No hay mensaje')
        return
      }
      msg.delete().catch((e: any) => {
        console.error(e)
      })
    })
    .catch((e: any) => {
      console.error(e)
    })
}

const msgEdit = (int: any, client: any, data: any, msg: any) => {
  int?.message
    ?.edit({
      embeds: int.message.embeds,
      content: int.message.content,
      components: int.message.components,
      ...data
    })
    .then(() => int.reply({ content: msg, ephemeral: true }))
    .catch((e: any) => {
      int.reply({
        content: `Ocurrio un error al editar el mensaje: ${e.message}`,
        ephemeral: true
      })
      client.logger('aceptarMod', 'error', e.stack)
    })
}

const sendMessageMemberDM_API = async (member: any, message: any, id: any) => {
  try {
    const url = 'https://discord.com/api/v8/users/@me/channels'
    const headers = {
      Authorization: `Bot ${DiscordKeys.DISCORD_TOKEN}`,
      'Content-Type': 'application/json'
    }

    const data = {
      recipient_id: member
    }

    const res = await axios.post(url, data, { headers })
    const channel = res.data

    const url2 = `https://discord.com/api/v8/channels/${channel.id}/messages`
    const headers2 = {
      Authorization: `Bot ${DiscordKeys.DISCORD_TOKEN}`,
      'Content-Type': 'application/json'
    }

    const buttons = [
      {
        type: 2,
        style: 1,
        label: 'Aceptar',
        custom_id: `fbss-${id}`
      },
      {
        type: 2,
        style: 4,
        label: 'Rechazar',
        custom_id: `fbsn-${id}`
      }
    ]

    const data2 = {
      content: message,
      components: [
        {
          type: 1,
          components: buttons
        }
      ]
    }

    const res2 = await axios.post(url2, data2, { headers: headers2 })
    const message2 = res2.data

    return message2
  } catch (error) {
    console.log(error)
    return error
  }
}

export {
  Embed,
  Webhook,
  Button,
  SelectMenu,
  Modal,
  ModelInput,
  createThread,
  deleteMessageTime,
  msgEdit,
  sendMessageMemberDM_API
}
