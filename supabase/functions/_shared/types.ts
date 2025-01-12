export interface ResponseBody {
	message: string;
	status: number;
	error?: string;
	roomUUID?: string;
	roomPass?: string;
  sessionID?: string;
}
