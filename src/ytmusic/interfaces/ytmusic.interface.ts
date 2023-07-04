export interface YtmusicRepository {
  getHomeFeed(): any;
  getInfo(video_id: string, client?: string): any;
}
