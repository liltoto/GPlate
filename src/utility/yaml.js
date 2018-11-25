const fs = require('fs-extra')
const yaml = require('js-yaml')
const fileHandler = require('./fileHandler')

const log = console.log
const flagName = flag => {
  return flag
    .replace('--', '')
    .replace('no-', '')
    .replace('-', '');
}

const collect = (val, memo) => {
  if (Array.isArray(memo))return [Object.assign(...memo, { [val]: !memo[0][val] })]
  else if (val) return [{ [val]: true }]
}

module.exports.addFromYAML = program => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('.gplate', 'utf8'))
    doc.task.forEach(element => {
      if (element.options) program.option(`${element.flags} [${element.options}]`, element.description, collect, element.default ? element.default : false)
      else program.option(element.flags, element.description)
    })
  } catch (e) {
    log(e)
  }
}

module.exports.checkOptionsFromYAML = program => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('.gplate', 'utf8'))
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
        (program.rawArgs.includes(shortName) || program.rawArgs.includes(longName))
      ) {
        const files = fileHandler.createFiles(element.files, { path: options.path,  options: Array.isArray(options[longName]) ? options[longName] : [] })
        fileHandler.saveFiles(files)
      }
    })
  } catch (e) {
    log(e)
  }
}