module.exports = (msg, value) => {
  if (value[0].stack) msg.text += ' '+ (this.config.debugMode ? value[0].stack : value[1]);
  else msg.text += ` [${value.toString()}]`;
}
