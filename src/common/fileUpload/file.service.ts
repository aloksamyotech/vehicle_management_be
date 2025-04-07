import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { messages } from '../constant';

@Injectable()
export class FileService {
  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(messages.data_not_found);
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(messages.invalid_type);
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(messages.too_large);
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadsDir, filename);

    try {
      fs.writeFileSync(filePath, file.buffer);
    } catch (error) {
      throw new BadRequestException(messages.data_add_failed);
    }

    return { 
      message: messages.file_success, 
      filePath: path.join('uploads', filename),
      filename: filename
    };
  }
}
