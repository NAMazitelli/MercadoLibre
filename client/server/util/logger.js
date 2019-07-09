/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

const logger = {
  error: (err) => {
    console.error(chalk.red(err));
  },

  appStarted: (port, host) => {
    console.log(`Servidor iniciado correctamente ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Accesos en:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Presiona ${chalk.italic('CTRL-C')} para detenerlo.`)}
    `);
  }
};

module.exports = logger;
