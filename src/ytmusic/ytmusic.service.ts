import { Injectable } from '@nestjs/common';
import { YtmusicRepository } from './interfaces/ytmusic.interface';

@Injectable()
export class YtmusicService {
  constructor(private readonly repository: YtmusicRepository) {}

  async getHomeFeed(): Promise<any> {
    return this.repository.getHomeFeed();
  }

  async getTrack(track_id: string): Promise<any> {
    return this.repository.getInfo(track_id, 'iOS'); // TODO: get this parameter from app
  }
}
