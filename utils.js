//create token
function getRandom(len = 115) {
  let uniqueId = "";
  let chars =
    "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz".split("");
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    chars.sort(() => {
      return 0.5 - Math.random();
    });
    uniqueId += chars[Math.floor(Math.random() * charsLength)];
  }

  return (uniqueId += Date.now());
}

module.exports = { getRandom };
