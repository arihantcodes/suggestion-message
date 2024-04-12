import { Message } from "@/models/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptmessage?: boolean;
    messages?:Array<Message>;
}