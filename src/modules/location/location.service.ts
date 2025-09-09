import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

 async createLocation(data: CreateLocationDto) {
      
  return this.prisma.location.create({
    data,
  });
}

  async getLocationsByBooking(bookingId: number) {
  return this.prisma.location.findMany({
    where: { bookingId },
    orderBy: { createdAt: 'desc' },
  });
}
}
