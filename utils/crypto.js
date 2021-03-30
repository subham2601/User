const crypto = require('crypto');

module.exports = {
  genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  },
  sha512(value, salt) {
    const hash = crypto.createHmac('sha512', salt);

    hash.update(value);

    return {
      salt: salt,
      value: hash.digest('hex'),
    };
  },
};
