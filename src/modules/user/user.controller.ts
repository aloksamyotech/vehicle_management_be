import { Body, Controller, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
// const interface :  = {

// }
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    // POST API with Params
    // @Post('update/:id')
    // async updateUser(@Param('id') id: string, @Body() body: { name?: string; email?: string }) {
    //     return this.userService.updateUser(id, body);
    // }
}