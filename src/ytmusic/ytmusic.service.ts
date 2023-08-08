import { Injectable } from '@nestjs/common';
import { YtmusicRepository } from './interfaces/ytmusic.interface';

// this was so clean lol.
@Injectable()
export class YtmusicService {
  constructor(private readonly repository: YtmusicRepository) {}

  public async getHomeFeed(): Promise<any> {
    return this.repository.getHomeFeed();
  }

  public async getTrack(track_id: string): Promise<any> {
    return this.repository.getInfo(track_id, 'iOS'); // TODO: get this parameter from app
  }
}
