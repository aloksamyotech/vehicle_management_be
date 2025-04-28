import {
  Body,
  Controller,
  Query,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { FileService } from 'src/common/fileUpload/file.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { messages } from 'src/common/constant';

@Controller('api/vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly fileService: FileService,
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
      ? this.vehicleService.getAll()
      : this.vehicleService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
    ]),
  )
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      doc?: Express.Multer.File[];
    },
  ) {
    try {
      const existingVehicle = await this.vehicleService.getById(id);
      if (!existingVehicle) {
        throw new NotFoundException(messages.data_not_found);
      }

      let imagePath: string | undefined;
      let docPath: string | undefined;

      if (files?.image?.[0]) {
        if (existingVehicle.image) {
          this.fileService.deleteFile(existingVehicle.image);
        }
        const imageUpload = this.fileService.handleFileUpload(files.image[0]);
        imagePath = imageUpload.filePath;
      }

      if (files?.doc?.[0]) {
        if (existingVehicle.doc) {
          this.fileService.deleteFile(existingVehicle.doc);
        }
        const docUpload = this.fileService.handleFileUpload(files.doc[0]);
        docPath = docUpload.filePath;
      }

      const updateData = {
        ...updateVehicleDto,
        image: imagePath || updateVehicleDto.image,
        doc: docPath || updateVehicleDto.doc,
      };

      return this.vehicleService.updateVehicle(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.removeVehicle(id);
  }
}
