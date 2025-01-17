import { jsonrepairTransform } from 'jsonrepair/stream'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'

const inputStream = createReadStream('./src/zhCN.json')
const outputStream = createWriteStream('./src/jaJP.json')

pipeline(inputStream, jsonrepairTransform(), outputStream, () => {})

import { writeFile } from 'node:fs/promises'
import en from './enGB.json' with { type: 'json' }
import ja from './jaJP.json' with { type: 'json' }

const table = Object.keys(ja.strings).flatMap((key) => {
  if (ja.strings[key].length > 30 || ja.strings[key] === '') return []
  if (/(^「.+」$|\{.+\})/.test(ja.strings[key])) return []
  return [[en.strings[key], ja.strings[key]]]
})

await writeFile('./dist/pathfinder-wotr.json', JSON.stringify(table))
