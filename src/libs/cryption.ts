import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const key = import.meta.env.VITE_ENCRYPTION_KEY;

export const encrypt = (plainText: string) => {
  const encrypted = AES.encrypt(plainText, key);
  return encrypted.toString();
}

export const decrypt = (encryptedText: string) => {
  const decrypted = AES.decrypt(encryptedText, key);
  return decrypted.toString(Utf8);
}

