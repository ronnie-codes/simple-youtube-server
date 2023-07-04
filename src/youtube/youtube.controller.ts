import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly service: YoutubeService) {}

  @Get('video/:id')
  public async getTrack(@Param('id') id: string): Promise<any> {
    return this.service.getTrack(id);
  }

  @Get('home-feed')
  public async getHomeFeed(): Promise<any> {
    return this.service.getHomeFeed();
  }
}
