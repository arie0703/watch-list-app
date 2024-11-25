export interface NewRoomFormInput {
  roomName: string;
  roomPass?: string;
}

export interface NewRoomResponse {
  status: number;
  message: string;
  isSuccess: boolean;
  sessionId?: string;
  roomInfo?: {
    name: string;
    pass: string;
    uuid: string;
  }
  error?: string;
}
