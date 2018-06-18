/* Автор - Пряхин Игорь  ::  BART96  ::  Author - Prjakhin Igor */
/* Уважайте чужой труд.  ::  Respect other peoples work. */

'use strict';

const Format = require('bart96-format');
const styleCli = require('bart96-style-cli');


class StyleCliUltimate {
  constructor(opt = {}) {
    if (typeof opt != 'object') throw new Error(`В класс ${this.constructor.name} можно передавать только object.`);

    this.config = Object.assign({
      form: '> [yyyy.mm.dd HH:MM]',
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


  _msgReplacer(msg) {
    this.config.replacer.forEach(rep => msg.text.replace(rep[0], rep[1]));

    msg.text
      .replace(/(?:Warn|Error)/g, str => styleCli[str == 'Warn' ? 'yellow' : 'red'](str))
      .replace(/(?:✖|✔)/g, str => styleCli[str == '✔' ? 'green' : 'red'](str));
  }

  _msgAssembly(msg) {
    let parent = '';
    let typeName = this.config.typeArray[msg.type] || 'NoTitle';
    let color = this.config.typeColor[typeName] || this.config.typeColor['Null'] || 'white';

    try {throw new Error()}
    catch (err) {parent = /at Object\.<anonymous> \(.*?\\(.+):\d+:\d+\)$/gm.exec(err.stack)[1].split(/\/|\\/).pop();}

    msg.text = styleCli`{${color} ${this.format.date()}} [{${color}Bright ${typeName}}]{white \t=>} (${parent}){blackBright ${msg.text}}`;
  }


  log(...args) {
    let msg = {
      text: '',
      type: 1,
      exit: false,
    };

    for(let item of args) require('./types/log'+ {}.toString.call(item).slice(8, -1))(msg, item);

    if (!msg.text) return;
    if (this.config.dev == true) return msg.text;

    this._msgReplacer(msg);
    this._msgAssembly(msg);

    msg.exit ? process.exit(console.log(msg.text)) : console.log(msg.text);
  }

}



module.exports = StyleCliUltimate;
