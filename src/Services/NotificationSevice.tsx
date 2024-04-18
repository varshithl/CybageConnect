import axios from "axios";

export interface NotificationProp {
  ReqId: number;
  senderId: number;
  receiverId: number;
  rqstMessage: string;
}

export async function fetchNotifications(username: string): Promise<NotificationProp[]> {
  const url = `https://localhost:7184/api/CybageConnect/Notifications?username=${username}`;
  const res = await axios.get<NotificationProp[]>(url);
  return res.data;
}

export async function acceptRequest(username: string, senderId: number): Promise<void> {
  const url = `https://localhost:7184/api/CybageConnect/AcceptRequest?toUser=${username}&fromUserId=${senderId}`;
  await axios.post(url);
}

export async function declineRequest(username: string, senderId: number): Promise<boolean> {
  const url = `https://localhost:7184/api/CybageConnect/DeclineRequest?toUser=${senderId}&fromUser=${username}`;
  const res = await axios.post<boolean>(url);
  return res.data;
}
