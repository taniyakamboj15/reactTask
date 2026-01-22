export interface IMessage {
  id: string;
  roomId: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}
