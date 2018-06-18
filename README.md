# Node.js – StyleCLI Ultimate (Logger)
A node.js package for displaying formatted text, array or object in the console with date.

[![Build Status](https://travis-ci.org/bart96-b/node-style-cli-ultimate.svg)](https://travis-ci.org/bart96-b/node-style-cli-ultimate)

## Installation
```bash
$ npm install bart96-style-cli-ultimate
```

## Usage
```js
const Logger = require('bart96-style-cli-ultimate');
let logger = new Logger({ /* options */ });
```

function | Result
-------- | ------
`logger.log()` | > [2018.06.20 00:00] [error]   => (styleCliUltimate.js) foo bar baz
`logger.log('foo bar')` | > [2018.06.20 00:00] [error]   => (styleCliUltimate.js) foo bar
`logger.log('foo bar', 1)` | > [2018.06.19 00:14] [error]    => (styleCliUltimate.js) foo bar
`logger.log('foo bar', 2)` | > [2018.06.19 00:14] [warn]    => (styleCliUltimate.js) foo bar
`logger.log('foo bar', 3)` | > [2018.06.19 00:14] [info]    => (styleCliUltimate.js) foo bar
`logger.log('foo bar', 99)` | > [2018.06.19 00:14] [NoTitle]    => (styleCliUltimate.js) foo bar
`logger.log(true, false)` | > [2018.06.20 00:00] [error]   => (styleCliUltimate.js) true false
`logger.log(['foo', 'bar', 'baz'])` | > [2018.06.20 00:00] [error]   => (styleCliUltimate.js) [foo,bar,baz]
`logger.log(foo => {return bar})` | > [2018.06.19 00:14] [error]    => (styleCliUltimate.js) foo => {return bar}

## Options (Object)
№ | Parameter | Type | Optional | Default | Description
-- | --------- | ---- | :------: | :-----: | -----------
1\. | `form` | string | ✓ | `yyyy.mm.dd HH:MM` | [bart96-format](https://github.com/bart96-b/node-format#options-object)
2\. | `UTC` | boolean | ✓ | `false` | [bart96-format](https://github.com/bart96-b/node-format#options-object)
3\. | `replacer` | array | ✓ | `[]` | `[ ['for example', 'e.g.'], ['that is', 'i.e.'], ]`
4\. | `debugMode` | boolean | ✓ | `false` | `debugMode == true ? err.stack : err.name +' '+ err.message`
5\. | `typeColor` | object | ✓ | `{'Null':'white', 'error' : 'red', ...}` | Title = obj.key; Color = obj.value
