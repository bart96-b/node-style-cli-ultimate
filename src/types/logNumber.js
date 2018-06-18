module.exports = (msg, value) => {
  msg.type = Math.abs(value);
  if (value < 0) msg.exit = true;
}
