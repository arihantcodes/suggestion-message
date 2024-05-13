import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";

import { Message } from "@/models/User";

export async function POST(request: Request) {
  await connect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 400 }
      );
    }

    if (!user.isAccepting) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 400 }
      );
    }

    const newMessage = { content, createdAt:new Date() };
    console.log(newMessage)
   user.messages.push(newMessage as Message)
   await user.save()
    return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
        {
          success: false,
          message: "Message not send",
        },
        { status: 400 }
      );
  }
}
