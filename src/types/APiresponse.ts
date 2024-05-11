import { Message } from "@/models/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAccepting?: boolean;
    messages?:Array<Message>;
}