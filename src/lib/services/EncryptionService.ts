import crypto from "crypto";
import {
   OH_CRYPTO_CIPHER,
   OH_CRYPTO_IV_LENGTH,
   OH_CRYPTO_RANDOM_CHARACTER_COUNT,
   cryptoCipherList,
} from "../GlobalConstants";
import { IsHelper } from "../helpers/IsHelper";

export class EncryptionService {
   public symmetricEncrypt = (text: string): string => {
      const cryptoEnvironment = this.getCryptoEnvironment();

      const iv = crypto.randomBytes(cryptoEnvironment.ivLength);
      const cipher = crypto.createCipheriv(cryptoEnvironment.cipher, Buffer.from(cryptoEnvironment.key), iv);

      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      let final = `${iv.toString("hex")}:${encrypted.toString("hex")}`;
      final = this.addProtection(final, cryptoEnvironment.randomCharacterCount);

      return final;
   };

   public symmetricDecrypt(text: string): string {
      const cryptoEnvironment = this.getCryptoEnvironment();

      text = this.removeProtection(text, cryptoEnvironment.randomCharacterCount);

      const [ivHex, encryptedHex] = text.split(":");
      const iv = Buffer.from(ivHex, "hex");

      const encrypted = Buffer.from(encryptedHex, "hex");
      const decipher = crypto.createDecipheriv(cryptoEnvironment.cipher, Buffer.from(cryptoEnvironment.key), iv);

      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      let final = decrypted.toString();

      return final;
   }

   private getCryptoEnvironment = (): {
      cipher: string;
      ivLength: number;
      key: string;
      randomCharacterCount: number;
   } => {
      const returnObject = {
         cipher: "",
         ivLength: 0,
         key: "",
         randomCharacterCount: 0,
      };

      const cipher = (process.env.OMNIHIVE_CRYPTO_CIPHER as string) ?? OH_CRYPTO_CIPHER;

      if (IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(cipher)) {
         throw new Error("Crypto cipher is not set in the environment");
      }

      if (!cryptoCipherList.includes(cipher)) {
         throw new Error("Crypto cipher is not supported");
      }

      returnObject.cipher = cipher;

      const ivLength = parseInt((process.env.OMNIHIVE_CRYPTO_IV_LENGTH as string) ?? OH_CRYPTO_IV_LENGTH.toString());

      if (isNaN(ivLength)) {
         throw new Error("Crypto IV length is not set in the environment");
      }

      if (ivLength <= 0) {
         throw new Error("Crypto IV length is not valid");
      }

      if (ivLength % 16 !== 0) {
         throw new Error("Crypto IV length is not a multiple of 16");
      }

      if (ivLength > 256) {
         throw new Error("Crypto IV length is too long");
      }

      returnObject.ivLength = ivLength;

      const key = process.env.OMNIHIVE_CRYPTO_KEY as string;

      if (IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(key)) {
         throw new Error("Crypto key is not set in the environment");
      }

      returnObject.key = key;

      const randomCharacterCount = parseInt(
         (process.env.OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT as string) ?? OH_CRYPTO_RANDOM_CHARACTER_COUNT.toString(),
      );

      if (isNaN(randomCharacterCount)) {
         throw new Error("Crypto random character count is not set in the environment");
      }

      if (randomCharacterCount < 0) {
         throw new Error("Crypto random character count is not valid");
      }

      if (randomCharacterCount > 256) {
         throw new Error("Crypto random character count is too long");
      }

      returnObject.randomCharacterCount = randomCharacterCount;

      return returnObject;
   };

   private generateRandomCharacters = (randomCharacterCount: number): string => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < randomCharacterCount; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
   };

   private addProtection = (message: string, randomCharacterCount: number) => {
      const protectNumber = IsHelper.isPositiveInteger(randomCharacterCount)
         ? randomCharacterCount
         : Number.parseInt(process.env["NEXT_PUBLIC_ENCRYPTION_PROTECT"] ?? "0");

      return `${this.generateRandomCharacters(protectNumber)}${message.slice(
         0,
         message.length / 2,
      )}${this.generateRandomCharacters(protectNumber)}${message.slice(
         message.length / 2,
      )}${this.generateRandomCharacters(protectNumber)}`;
   };

   private removeProtection = (message: string, randomCharacterCount: number) => {
      const protectNumber = IsHelper.isPositiveInteger(randomCharacterCount)
         ? randomCharacterCount
         : Number.parseInt(process.env["NEXT_PUBLIC_ENCRYPTION_PROTECT"] ?? "0");
      const primaryFilter = message.slice(protectNumber, message.length - protectNumber);

      return `${primaryFilter.slice(0, (primaryFilter.length - protectNumber) / 2)}${primaryFilter.slice(
         (primaryFilter.length + protectNumber) / 2,
      )}`;
   };
}
