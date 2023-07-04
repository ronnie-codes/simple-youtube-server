import { Injectable } from '@nestjs/common';
import { YoutubeRepository } from './interfaces/youtube.interface';

@Injectable()
export class YoutubeService {
  constructor(private readonly repository: YoutubeRepository) {}

  async getTrack(video_id: string): Promise<any> {
    return this.repository.getInfo(video_id, 'iOS'); // TODO: get this parameter from app
  }

  async getHomeFeed(): Promise<any> {
    return this.repository.getHomeFeed();
  }
}
