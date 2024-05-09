import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await connect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 400 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: { id: userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: { _id: "$_id", messages: { $push: "messages" } },
      },
    ]);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 400 }
      );
    }


    return Response.json(
        {
          success: true,
          messages: user[0].messages,



        },
        { status: 400 }
      );
  } catch (error) {
    return Response.json(
        {
          success: false,
          message: "Message Not Found",
        },
        { status: 400 }
      );
  }
}
