import fs from 'fs-extra'
import yaml from 'js-yaml'
import chalk from 'chalk'
import fileHandler from './fileHandler'

const { info } = console
const flagName = flag =>
  flag
    .replace('--', '')
    .replace('no-', '')
    .replace('-', '')

const collect = (val, memo) =>
  Array.isArray(memo)
    ? [Object.assign(...memo, { [val]: !memo[0][parseInt(String(val), 0)] })]
    : [{ [val]: true }]

export const addFromYAML = program => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('gplate.yaml', 'utf8'))
    doc.task.forEach(element => {
      if (element.options)
        program.option(
          `${element.flags} [${element.options}]`,
          element.description,
          collect,
          element.default ? element.default : false,
        )
      else program.option(element.flags, element.description)
    })
  } catch (e) {
    info(chalk.bgRed.black(`Couldn't find any gplate.yaml file.`))
  }
}

export const checkOptionsFromYAML = program => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('gplate.yaml', 'utf8'))
    const options = program.opts()
    let longName
    let shortName

    doc.task.forEach(element => {
      const flags = element.flags.split(/[ ,|]+/)
      if (flags.length > 1 && !/^[[<]/.test(flags[1])) shortName = flags.shift()
      longName = flagName(flags.shift())

      if (
        longName &&
        (options[longName] || options[String(longName).toUpperCase()]) &&
        (program.rawArgs.includes(shortName) ||
          program.rawArgs.includes(longName))
      ) {
        const files = fileHandler.createFiles(element.files, {
          path: options.path,
          options: Array.isArray(options[longName]) ? options[longName] : [],
        })
        fileHandler.saveFiles(files)
      }
    })
  } catch (e) {
    info(e)
  }
}
