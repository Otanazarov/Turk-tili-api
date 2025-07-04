import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @DecoratorWrapper('Register User')
  create(@Body() createUserDto: RegisterUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @DecoratorWrapper('User Login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('refresh')
  @DecoratorWrapper('Refresh User Token')
  refresh(@Body() refreshUserDto: RefreshUserDto) {
    return this.userService.refresh(refreshUserDto);
  }

  @Post('logout')
  @DecoratorWrapper('User Logout', true, [Role.USER])
  logout(@Req() req: any) {
    return this.userService.logout(req.user.id);
  }

  @Get()
  @DecoratorWrapper('Get All Users')
  findAll(@Query() query: FindAllUserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get User by ID', true, [Role.USER])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update User', true, [Role.USER])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // @DecoratorWrapper('Delete User', true, [Role.User])
  // remove(@Param('id',ParseIntPipe) id: string) {
  //   return this.userService.remove(+id);
  // }
}
