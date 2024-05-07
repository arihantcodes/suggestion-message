import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";

export async function POST(request: Request) {
  await connect();

  try {
    const { username, otp } = await request.json();

    const decode = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decode });

    if (!user) {
      return Response.json(
        {
          message: "User Does Not Exits",
          success: false,
        },
        { status: 400 }
      );
    }

    const iscodevalid = user.verifycode === otp;
    const iscodeExp = new Date(user.verfifycodeexpires) > new Date();
    

    if(iscodevalid && iscodeExp){
        user.isverified =true
        await user.save()
        return Response.json(
            {
              message: "Account Verify Succesfully",
              success: true,
            },
            { status: 200 }
          );

    }else if(!iscodeExp){
        return Response.json(
            {
              message: "OTP is Exp please SignUp Again ",
              success: false,
            },
            { status: 400 }
          );
    }else{
        return Response.json(
            {
              message: "Wrong OTP",
              success: false,
            },
            { status: 400 }
          );
    }

} catch (error) {
    console.log("Failed To Verify code", error);
    return Response.json(
      {
        message: "Failed To verify Code",
        success: false,
      },
      { status: 400 }
    );
  }
}
