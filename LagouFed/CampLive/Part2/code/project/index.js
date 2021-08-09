const program = require('commander')
const chalk = require('chalk')
const path = require('path')

program.version(require('./package.json').version)
program.option('-d, --dir <dirpath>', 'set the output directory, default to .')

program.command('build [options]')
  .description('build for production')
  .action((env, options) => {
    // const { dir } = options.parent
    console.log(env, options, program.opts())
    console.log(chalk.green('[INFO] >>> build start...'))
  })

program.command('dev [options]')
  .description('starts a bundler in watch mode')
  .action((env, options) => {
    console.log(chalk.green('[INFO] >>> dev start...'))
  })

program.command('project [options]')
  .description('create new project')
  .action((env, options) => {
    console.log(chalk.green('[INFO] >>> create project start...'))
  })

program.command('page [options]')
  .description('create new page')
  .action((env, options) => {
    console.log(chalk.green('[INFO] >>> create page start...'))
  })

program.parse(process.argv)
