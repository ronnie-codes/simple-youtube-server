import { Controller, Get, Param } from '@nestjs/common';
import { YtmusicService } from './ytmusic.service';

@Controller('ytmusic')
export class YtmusicController {
  constructor(private readonly service: YtmusicService) {}

  @Get('audio/:id')
  public async getTrack(@Param('id') id: string): Promise<any> {
    return this.service.getTrack(id);
  }

  @Get('home-feed')
  public async getHomeFeed(): Promise<any> {
    return this.service.getHomeFeed();
  }
}
