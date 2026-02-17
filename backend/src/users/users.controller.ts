import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
      select: ['id', 'first_name', 'last_name', 'email',, 'role', 'status', 'created_at']
    });
    
    if (!user) return { error: 'User not found' };
    return user;
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() body: any) {
    await this.userRepository.update(req.user.id, {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email
    });
    
    return this.userRepository.findOne({
      where: { id: req.user.id },
      select: ['id', 'first_name', 'last_name', 'email', 'role', 'status']
    });
  }
}