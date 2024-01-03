const crypto = require('crypto');

async function hash(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString('hex');

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verify(password, passwordHash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = passwordHash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

module.exports = {
  hash,
  verify,
};
