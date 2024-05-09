import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function POST(request: Request) {
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

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const UpdatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAccepting: acceptMessages,
      },
      { new: true }
    );

    if (!UpdatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not Update the message setting",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status Update setting succesfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accept message");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept message",
      },
      { status: 504 }
    );
  }
}

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

  const userId = user._id;

 try {
   const Founduser = await UserModel.findById(userId);
 
   if (!Founduser) {
     return Response.json(
       {
         success: false,
         message: "User Not Found",
       },
       { status: 408 }
     );
   }
   return Response.json(
     {
       success: true,
       isAccepting: Founduser.isAccepting,
       message: "User Found",
     },
     { status: 200 }
   );
 } catch (error) {
  console.log("failed to update user status to accept message");
  return Response.json(
    {
      success: false,
      message: "Error in getting Messagees",
    },
    { status: 504 }
  );
}
}
