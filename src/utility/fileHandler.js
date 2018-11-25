const fs = require('fs-extra')
const path = require('path')
const handlebars = require('handlebars')
const chalk = require('chalk')

handlebars.registerHelper('operators', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
})

module.exports.createFiles = (files, config) => {
  const realPath = path.extname(config.path) ? path.dirname(config.path) : config.path
  const name = realPath.split(path.sep).pop()
  const view = Object.assign({name}, ...config.options)
  return files.map(file => {
    const filename = path.basename(file.output)
    const input = fs.readFileSync(path.join(process.cwd(), file.input), 'utf8')
    const output = handlebars.compile(input)(view)
    return {
      path: realPath,
      name: filename,
      options: config.options,
      output,
    }
  })
}

const printOptions = options => Object.entries(...options).map(opt => opt.join(': '))

module.exports.saveFiles = (files) => {
  console.log('Files created:')
  files.forEach(file => {
    fs.outputFileSync(path.join(file.path, file.name), file.output)
    console.log(chalk.cyan.bold(`${file.name}`))
  })
  console.log(`Options:\n${chalk.magenta.bold(printOptions(files[0].options))}`)
}