import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageid = params.messageid;
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

  try {
    const updateresult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );
    

    if(updateresult.modifiedCount == 0){
      return Response.json(
        {
          success: false,
          message: "Message Not Found",
        },
        { status: 406 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message Deleted",
      },
      { status: 200 }
    );



  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error Deleting Message from server",
      },
      { status: 500 }
    );
  }
}