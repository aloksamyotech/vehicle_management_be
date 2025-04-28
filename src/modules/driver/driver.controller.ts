import {
  Body,
  Controller,
  Query,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { FileService } from 'src/common/fileUpload/file.service';
import {
  CreateDriverDto,
  UpdateDriverDto,
  UpdateStatusDto,
} from './driver.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CryptoService } from 'src/common/crypto.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { messages } from 'src/common/constant';

@Controller('api/driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly fileService: FileService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.driverService.getAll()
      : this.driverService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  async createDriver(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      doc?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    let imagePath: string | undefined;
    let docPath: string | undefined;

    if (files?.image?.[0]) {
      const imageUpload = this.fileService.handleFileUpload(files.image[0]);
      imagePath = imageUpload.filePath;
    }

    if (files?.doc?.[0]) {
      const docUpload = this.fileService.handleFileUpload(files.doc[0]);
      docPath = docUpload.filePath;
    }

    const driverData = {
      ...body,
      age: Number(body.age),
      totalExp: Number(body.totalExp),
      image: imagePath,
      doc: docPath,
    };

    return this.driverService.createDriver(driverData);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDriverDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      doc?: Express.Multer.File[];
    },
  ) {
    const existingDriver = await this.driverService.getById(id);
    if (!existingDriver) {
      throw new BadRequestException(messages.data_not_found);
    }

    let imagePath: string | undefined;
    let docPath: string | undefined;

    if (files?.image?.[0]) {
      if (existingDriver.image) {
        this.fileService.deleteFile(existingDriver.image);
      }
      const imageUpload = this.fileService.handleFileUpload(files.image[0]);
      imagePath = imageUpload.filePath;
    }

    if (files?.doc?.[0]) {
      if (existingDriver.doc) {
        this.fileService.deleteFile(existingDriver.doc);
      }
      const docUpload = this.fileService.handleFileUpload(files.doc[0]);
      docPath = docUpload.filePath;
    }
    const updateData: any = { ...updateDto };
    if (updateData.age) {
      updateData.age = parseInt(updateData.age);
    }
    if (updateData.totalExp) {
      updateData.totalExp = parseInt(updateData.totalExp);
    }
    if (imagePath) {
      updateData.image = imagePath;
    }
    if (docPath) {
      updateData.doc = docPath;
    }

    return this.driverService.update(id, updateData);
  }

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.driverService.updateStatus(Number(id), statusDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.removeDriver(id);
  }
}
