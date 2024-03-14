import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly service: YoutubeService) {}

  @Get('home-feed')
  public async getHomeFeed(): Promise<any> {
    return this.service.getHomeFeed();
  }
}
