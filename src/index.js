#!/usr/bin/env node

import fs from 'fs-extra'
import process from 'process'
import path from 'path'
import program from 'commander'
import { red } from 'chalk'
import { version } from '../package.json'
import yaml from './utility/yaml'
import inquirer from 'inquirer'

const log = console.log
const getCorrectPath = val => path.resolve(process.cwd(), val)

program
  .version(version, '-v --version')
  .option('-p, --path <s>', 'The path of the folders you want to create which contains the files', getCorrectPath)

yaml.addFromYAML(program)

program.parse(process.argv)
 
if (!program.path) {
  log(red('You must define path!'))
  process.exit(1)
} else {
  if (fs.pathExistsSync(program.path)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'The path already exists are you sure about overwrite it?',
          default: false
        }
      ])
      .then(answers => {
        if (answers.overwrite) yaml.checkOptionsFromYAML(program)
        else process.exit(1)
      })
  } else {
    yaml.checkOptionsFromYAML(program)
  }
}

