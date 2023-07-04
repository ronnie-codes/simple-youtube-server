export class MessageEvent {
  public data: string | object;
  public id?: string;
  public type?: string;
  public retry?: number;
}
