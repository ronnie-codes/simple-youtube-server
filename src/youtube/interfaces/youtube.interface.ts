export interface YoutubeRepository {
  getHomeFeed(): any;
  getInfo(video_id: string, client?: string): any;
}
