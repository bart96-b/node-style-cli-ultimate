module.exports = (msg, value) => {
  if (value.stack && value.name && value.message) msg.text = this.config.debugMode ? value.stack : `${msg.text?' \u27A4':''} ${value.name}: ${value.message}`;
  // else if (el.author) {user = el.author.tag.replace(/#(\d{4})$/, ' $1'); type=6}
  else msg.text += ' '+ value.toString();
}
