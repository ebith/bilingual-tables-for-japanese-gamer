import { XMLParser } from 'fast-xml-parser'
import { readFile, writeFile } from 'node:fs/promises'
const jaXml = await readFile('./src/LanguageFormat_Japanese_texts.xml')
const enXml = await readFile('./src/LanguageFormat_English_texts.xml')

const options = { ignoreDeclaration: true, ignoreAttributes: false }

const parser = new XMLParser(options)
const ja = parser.parse(jaXml)
const en = parser.parse(enXml)

const enObj = Object.fromEntries(en.TextFile.Texts.TextRepresentation.map((e) => [e.TextId, e]))

const table = ja.TextFile.Texts.TextRepresentation.flatMap((e) => {
  if (e.Text.length > 30) return []
  return [[enObj[e.TextId]?.Text, e.Text]]
})

await writeFile('./dist/dragon-age-inquisition.json', JSON.stringify(table))
