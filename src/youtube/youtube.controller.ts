import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly service: YoutubeService) {}

  @Get('video/:id')
  async getTrack(@Param('id') id: string): Promise<any> {
    return this.service.getTrack(id);
  }

  @Get('home-feed')
  async getHomeFeed(): Promise<any> {
    return this.service.getHomeFeed();
  }
}
