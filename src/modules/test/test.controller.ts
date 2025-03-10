import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {

    @Get()
    findUsers() {
        return "this is controller"
    }
}
