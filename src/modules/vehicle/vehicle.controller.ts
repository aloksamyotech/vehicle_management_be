import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { FileService } from 'src/common/fileUpload/file.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly fileService: FileService,
  ) {}

  @Get('fetch')
  async getAll() {
    return this.vehicleService.getAll();
  }

  @Post('save')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  async createVehicle(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      doc?: Express.Multer.File[];
    },
    @Body() body: CreateVehicleDto,
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

      const vehicleData = {
        ...body,
        image: imagePath,
        doc: docPath,
      };
      return this.vehicleService.createVehicle(vehicleData);
    } catch (error) {
      throw error;
    }
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.getById(id);
  }

  @Patch('update/:id')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Delete('delete/:id')
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.removeVehicle(id);
  }
}
