import fs from 'fs'
import path from 'path'

class JsonService {
  folder: string | undefined
  fileName: string
  path: string
  constructor (opts: { folder?: string, fileName: string, path: string }) {
    this.folder = opts.folder
    this.fileName = opts.fileName
    this.path = opts.path

    this.initialize()
  }

  initialize () {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true })
    }

    if (!fs.existsSync(this.getFilePath())) {
      fs.writeFileSync(this.getFilePath(), '{}')
    }
  }

  getFilePath () {
    return path.join(this.path, this.folder || '', this.fileName)
  }

  read () {
    const filePath = this.getFilePath()
    const file = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(file)
  }

  write (data: any) {
    const filePath = this.getFilePath()
    const file = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, file)

    return true
  }

  update (opts: { where: string, data: object }) {
    // json = { "users": [] } or { "users": { '123123123': [] }
    // where = 'users' or 'users.123123123'

    const filePath = this.getFilePath()
    const file = fs.readFileSync(filePath, 'utf-8')
    const json = JSON.parse(file)

    const whereArray = opts.where.split('.')
    const whereLength = whereArray.length

    let current = json
    for (let i = 0; i < whereLength; i++) {
      const key = whereArray[i]
      if (i === whereLength - 1) {
        current[key] = opts.data
      } else {
        current = current[key]
      }
    }
  }

  push (where: string, data: any) {
    // json = { "users": [] } or { "users": { '123123123': [] }
    // where = 'users' or 'users.123123123'
    const filePath = this.getFilePath()
    const file = fs.readFileSync(filePath, 'utf-8')
    const json = JSON.parse(file)

    const whereArray = where.split('.')
    const whereLength = whereArray.length

    let current = json
    for (let i = 0; i < whereLength; i++) {
      const key = whereArray[i]
      if (i === whereLength - 1) {
        current[key].push(data)
      } else {
        current = current[key]
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2))

    return true
  }

  delete () {
    const filePath = this.getFilePath()
    fs.unlinkSync(filePath)
  }
}

export { JsonService }
