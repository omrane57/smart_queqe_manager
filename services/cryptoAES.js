const CryptoJS = require("crypto-js");
const { isString } = require("lodash");

const encryptValue = (value, secretKey) => {
  if (!value || !secretKey || !isString(value))
    throw new TypeError(
      "Could not Encrypt a data. because of value or secretKey is Empty or Invalid"
    );
  const cipherValue = CryptoJS.AES.encrypt(value, secretKey).toString();

  return cipherValue;
};

const decryptValue = (cipherValue, secretKey) => {
  if (!cipherValue || !secretKey || !isString(cipherValue))
    throw new TypeError(
      "Could not Encrypt a data. because of cipherValue or secretKey is Empty or Invalid"
    );
  const bytes = CryptoJS.AES.decrypt(cipherValue, secretKey);
  const originalValue = bytes.toString(CryptoJS.enc.Utf8);
  return originalValue;
};

module.exports = {
  encryptValue,
  decryptValue,
};
