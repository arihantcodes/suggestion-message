import { connect } from "@/lib/dbconfig";
import { sendverication } from "@/helpers/sendverication";
import bycrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request: Request) {
  await connect();
  try {

   const {username,email,password} = await request.json()
  } catch (error) {
    console.log("Error in user Registeration: ", error);
    return Response.json
    ({ message: "Error in user Registeration",
        success: false,
     })
  }
}
