import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { FileService } from 'src/common/fileUpload/file.service';
import {
  CreateDriverDto,
  UpdateDriverDto,
  UpdateStatusDto,
} from './driver.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly fileService: FileService,
  ) {}

  @Get('fetch')
  async getAll() {
    return this.driverService.getAll();
  }

  @Post('save')
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
    @Body() body: CreateDriverDto,
  ) {
    let imagePath = '';
    let docPath = '';

    try {
      if (files?.image?.[0] && Object.keys(files.image[0]).length > 0) {
        const imageUpload = this.fileService.handleFileUpload(files.image[0]);
        imagePath = imageUpload.filePath;
      }

      if (files?.doc?.[0] && Object.keys(files.doc[0]).length > 0) {
        const docUpload = this.fileService.handleFileUpload(files.doc[0]);
        docPath = docUpload.filePath;
      }

      const driverData = {
        ...body,
        image: imagePath,
        doc: docPath,
      };
      return this.driverService.createDriver(driverData);
    } catch (error) {
      throw error;
    }
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.getById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDriverDto,
  ) {
    return this.driverService.update(id, updateDto);
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.driverService.updateStatus(Number(id), statusDto);
  }

  @Delete('delete/:id')
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.removeDriver(id);
  }
}
