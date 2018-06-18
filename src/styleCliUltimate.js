/* Автор - Пряхин Игорь  ::  BART96  ::  Author - Prjakhin Igor */
/* Уважайте чужой труд.  ::  Respect other peoples work. */

'use strict';

const Format = require('bart96-format');
const styleCli = require('bart96-style-cli');


class StyleCliUltimate {
  constructor(opt = {}) {
    if (typeof opt != 'object') throw new Error(`В класс ${this.constructor.name} можно передавать только object.`);

    this.config = Object.assign({
      replacer  : [],
      debugMode : false,
      typeColor : {
        'Null'  : 'white',

        'error' : 'red',
        'warn'	: 'yellow',
        'info'	: 'blue',

        'cmd'		: 'magenta',
        'bot'		: 'cyan',
        'user'  : 'cyan',
        'memory': 'green',
      },
    }, opt);

    this.format = new Format({form:this.config.form, UTC:this.config.UTC});
    this.config.typeArray = Object.keys(this.config.typeColor);

    this.config.typeArray.forEach(typeName => {
      Object.defineProperty(this, typeName, {
        value: (...args) => this.log(...args, this.config.typeArray.indexOf(typeName))
      });
    });
  }


  _logString(msg, value) {
    msg.text += ' '+ value;
  }

  _logNumber(msg, value) {
    msg.type = Math.abs(value);
    if (value < 0) msg.exit = true;
  }

  _logArray(msg, value) {
    if (value[0].stack) msg.text += ' '+ (this.config.debugMode ? value[0].stack : value[1]);
    else msg.text += ` [${value.toString()}]`;
  }

  _logObject(msg, value) {
    if (value.stack && value.name && value.message) msg.text = this.config.debugMode ? value.stack : `${msg.text?' \u27A4':''} ${value.name}: ${value.message}`;
    // else if (el.author) {user = el.author.tag.replace(/#(\d{4})$/, ' $1'); type=6}
  }

  _logBoolean(msg, value) {
    msg.text += ' '+ value.toString();
  }

  _logFunction(msg, value) {
    this.log(`Данная версия логгера не поддерживает тип данных "${{}.toString.call(value).slice(8, -1)}".`, 2);
  }


  _msgReplacer(msg) {
    this.config.replacer.forEach(rep => msg.text.replace(rep[0], rep[1]));

    msg.text
      .replace(/(?:Warn|Error)/g, str => styleCli[str == 'Warn' ? 'yellow' : 'red'](str))
      .replace(/(?:✖|✔)/g, str => styleCli[str == '✔' ? 'green' : 'red'](str));
  }

  _msgAssembly(msg) {
    let typeName = this.config.typeArray[msg.type];
    let color = this.config.typeColor[typeName] || this.config.typeColor['Null'];

    msg.text = styleCli`{${color} > [${this.format.date()}]} [{${color}Bright ${typeName}}]{white \t=>} {blackBright ${msg.text}}`;
    // (${moduleParent.filename.split(/\/|\\/).pop()})
  }


  log(...args) {
    let msg = {
      text: '',
      type: 1,
      exit: false,
    };

    for(let item of args) this['_log'+ {}.toString.call(item).slice(8, -1)](msg, item);

    if (!msg.text) return;

    this._msgReplacer(msg);
    this._msgAssembly(msg);

    msg.exit ? process.exit(console.log(msg.text)) : console.log(msg.text);
  }

}


// let logger = new StyleCliUltimate();
// logger.user('123', 5, {});

module.exports = StyleCliUltimate;
