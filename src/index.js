#!/usr/bin/env node

import '@babel/polyfill'
import fs from 'fs-extra'
import process from 'process'
import path from 'path'
import program from 'commander'
import { red } from 'chalk'
import inquirer from 'inquirer'
import { version } from '../package.json'
import { addFromYAML, checkOptionsFromYAML } from './utility/yaml'

const { info } = console
const getCorrectPath = val => path.resolve(process.cwd(), val)

program
  .version(version, '-v --version')
  .option(
    '-p, --path <s>',
    'The path of the folder(s) you want to create which contains the files',
    getCorrectPath,
  )

addFromYAML(program)
program.parse(process.argv)

const main = async () => {
  if (!program.path) {
    info(red('You must define path!'))
    return process.exit(1)
  }
  if (fs.pathExistsSync(program.path)) {
    const msg = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'The path already exists are you sure about overwrite it?',
        default: false,
      },
    ])
    return msg.overwrite ? checkOptionsFromYAML(program) : process.exit(1)
  }
  return checkOptionsFromYAML(program)
}

main()
