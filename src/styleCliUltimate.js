/* Автор - Пряхин Игорь  ::  BART96  ::  Author - Prjakhin Igor */
/* Уважайте чужой труд.  ::  Respect other peoples work. */

'use strict';

const Format = require('bart96-format');
const styleCli = require('bart96-style-cli');


class StyleCliUltimate {
  constructor(opt = {}) {
    if (typeof opt != 'object') process.exit(console.log(`В класс ${this.constructor.name} можно передавать только object.`));

    this.config = Object.assign({
      replacer: [],
      debugMode: false,
      defaultTitle: 'error',
      defaultColor: {
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

    this.format = new Format({form:opt.form, UTC:opt.UTC});

    // this.config = {
    //   replacer: opt.replacer || [],
    //   debugMode: opt.debugMode || false,
    //   defaultTitle: opt.defaultTitle || 'error',
    //   defaultColor: opt.defaultColor || {
    //     'Null'  : 'white',
    //
    //     'error' : 'red',
    //     'warn'	: 'yellow',
    //     'info'	: 'blue',
    //
    //     'cmd'		: 'magenta',
    //     'bot'		: 'cyan',
    //     'user'  : 'cyan',
    //     'memory': 'green',
    //   }
    // };

    // console.log(styleCli.red(this.format.date()));
  }


  _logString(msg, value) {
    msg.text += value;
  }

  _logNumber(msg, value) {
    msg.type = Math.abs(value);
    if (value < 0) msg.exit = true;
  }

  _logArray(msg, value) {
    msg.text += value;
  }

  _logObject(msg, value) {
    msg.text += value;
  }

  _logFunction(msg, value) {
    this.log('Данная версия логгера не поддерживает этот тип данных.');
  }


  log(...args) {
    let msg = {
      text: '',
      type: '',
      exit: false,
    };

    for(let item of args) {
      this.['_log'+ {}.toString.call(item).slice(8, -1)](msg, item);
    }

    if (!msg) return;


    msg.exit ? process.exit(console.log(msg.text)) : console.log(msg.text);
  }



  _getType(type) {
    if (typeof type == 'number') return Object.keys(this.config.typeColors)[type] || 'NotFound';
    if (typeof type == 'string') return this.config.typeColors[type] ? type : 'NotFound';
    return 'Null';
  }

  log_OFF(moduleParent, args) {
    let date = this.format.date(new Date(), this.config.formatDate);
    let type = this.config.typeFormat;
    let exit = false;

    let msg = '';
    let user = '';
    let color = '';

    for(let el of args) {
      switch (typeof el) {
        case 'string': msg += ` ${el}`; break;
        case 'number': type = Math.abs(el); if (el < 0) exit = true; break;
  			case 'object':
  				if (Array.isArray(el) && el[0].stack) msg += this.config.debugMode ? el[0].stack : el[1];
  				else if (el.stack && el.name && el.message) msg += this.config.debugMode ? el.stack : `${msg?' \u27A4':''} ${el.name}: ${el.message}`;
  				else if (el.author) {user = el.author.tag.replace(/#(\d{4})$/, ' $1'); type=6}
  				else this.log(module, [`Отсутствует условие для объекта "${el}". Элемент пропущен`, 2]);
  			break;
        // case 'function': ; break;

        default: this.log(module, [`Неизвестный формат "${typeof el}" у "${el}"`, 2]);
      }
    }

    if (!msg) return;

    user = this._getType(type);
    color = this.config.typeColors[user] || this.config.typeColors['Null'];

    msg = msg
      .replace(/\s(?:Warn|Error)/g, a => cli[a == 'Warn' ? 'yellow' : 'red'](' '+a))
      .replace(/(✖|✔)/ig, a => cli[a == '✔' ? 'green' : 'red'](a))
      .replace(/[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g, '[ClientToken]')
      .replace('  ', ' ');

    msg = cli`{${color} > ${date}} [{${color}Bright ${user}}]{white \t=>} (${moduleParent.filename.split(/\/|\\/).pop()}){blackBright ${msg}}`;

    exit ? process.exit(console.log(msg)) : console.log(msg);
  }

}


// new StyleCliUltimate();
module.exports = StyleCliUltimate;
