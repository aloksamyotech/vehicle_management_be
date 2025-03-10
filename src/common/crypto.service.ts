import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey: Buffer;
  private readonly salt: string;

  constructor() {
    this.secretKey = Buffer.from('2193275e9851e29e3ae01fbb8a47c3ab3385d3522167a5e3b3ea513373a3523f', 'hex'); 
    this.salt = '7dd94a286388dc6fc0f2dceb5c19a153';
  }

  encrypt(text: string): { encryptedText: string; iv: string } {
    const iv = randomBytes(16); 
    const key = scryptSync(this.secretKey, this.salt, 32); 

    const cipher = createCipheriv(this.algorithm, key, iv);
    const encryptedText = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);

    return {
      encryptedText: encryptedText.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  decrypt(encryptedText: string, iv: string): string {
    const key = scryptSync(this.secretKey, this.salt, 32);
    const decipher = createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));

    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }
}
