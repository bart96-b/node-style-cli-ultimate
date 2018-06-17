/* Автор - Пряхин Игорь  ::  BART96  ::  Author - Prjakhin Igor */
/* Уважайте чужой труд.  ::  Respect other peoples work. */

'use strict';

const Format = require('bart96-format');
const styleCli = require('bart96-style-cli');


class StyleCliUltimate {
  constructor(opt = {}) {
    this.format = new Format({form:opt.form, UTC:opt.UTC});

    console.log(styleCli.red(this.format.date()));
  }
}


new StyleCliUltimate();
module.exports = StyleCliUltimate;
