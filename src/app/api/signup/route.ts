import { connect } from "@/lib/dbconfig";
import { sendverication } from "@/helpers/sendverication";
import bycrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request: Request) {
  await connect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByusername = await User.findOne({
      username,
      isverified: true,
    });

    // check if username already exists

    if (existingUserVerifiedByusername) {
      return Response.json(
        {
          message: "Username  already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    const existingUserByemail = await User.findOne({
      email,
    });

    // otp generation

    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

    // check if email already exists

    if (existingUserByemail) {
      if (existingUserByemail.isverified) {
        return Response.json(
          {
            messsage: "user already exits with this email",
            success: false,
          },
          { status: 400 }
        );
      } else {
        const hashpassword = await bycrypt.hash(password, 11);
        existingUserByemail.password = hashpassword;
        existingUserByemail.verifycode = verifycode;
        existingUserByemail.verfifycodeexpires = new Date(Date.now() + 3600000);
        await existingUserByemail.save();
      }
    } else {
      const hashpassword = await bycrypt.hash(password, 11);
      const expairyDate = new Date();
      expairyDate.setHours(expairyDate.getHours() + 1);

      // create new user in database

      const user = new User({
        username,
        email,
        password: hashpassword,
        verifycode,
        verfifycodeexpires: expairyDate,
        isverified: false,
        isAccepting: true,
        messages: [],
      });
      await user.save();
    }

    //  send email

    const otp = await sendverication(email, username, verifycode);

    if (!otp.success) {
      return Response.json(
        {
          message: "failed to send email",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error in user Registeration: ", error);
    return Response.json({
      message: "Error in user Registeration",
      success: false,
    });
  }
}
