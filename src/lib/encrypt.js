// src/lib/encrypt.js  ←←← CREATE THIS NEW FILE

import CryptoJS from "crypto-js";

// Generate a strong key from user's password + email
export const generateKey = (email, password) => {
  return CryptoJS.SHA256(email.toLowerCase() + password).toString();
};

// Encrypt password
export const encryptPassword = (password, key) => {
  return CryptoJS.AES.encrypt(password, key).toString();
};

// Decrypt password
export const decryptPassword = (encryptedPassword, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return "[DECRYPTION FAILED]";
  }
};