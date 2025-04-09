import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createReadStream } from 'fs';

@Controller('file')
export class FileController {
  private readonly uploadPath = path.join(process.cwd(), 'uploads');

  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.handleFileUpload(file);
  }

  @Get('list')
  getFileList() {
    const files = fs.readdirSync(this.uploadPath);
    return files.map((filename) => ({
      name: filename,
      url: `/file/stream/${filename}`,
    }));
  }

  @Get('stream/:filename')
  streamFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(this.uploadPath, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    const stream = createReadStream(filePath);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    stream.pipe(res as any); 
  }
}
