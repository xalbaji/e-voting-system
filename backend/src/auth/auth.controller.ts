import { Controller, Post, Body, Req, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Req() req) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    if (user.status !== 'approved' && user.role !== 'admin') {
      throw new UnauthorizedException('Your account is pending approval');
    }
    
    const ipAddress = req.ip || req.connection.remoteAddress;
    return this.authService.login(user, ipAddress);
  }

  @Post('register')
  async register(@Body() body: any, @Req() req) {
    const ipAddress = req.ip || req.connection.remoteAddress;
    return this.authService.register(body, ipAddress);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req) {
    const ipAddress = req.ip || req.connection.remoteAddress;
    return this.authService.logout(req.user.id, req.user.email, ipAddress);
  }
}