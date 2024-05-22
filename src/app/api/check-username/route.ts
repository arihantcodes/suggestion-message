import { z } from "zod";
import UserModel from "@/models/User";
import { connect } from "@/lib/dbconfig";
import { uservalidation } from "@/schema/signupSchema";

const UsernameQuerySchema = z.object({
  username: uservalidation,
});

export async function GET(request: Request) {
 
  
  await connect();



  try {
    const { searchParams } = new URL(request.url);

    const QueryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(QueryParam);

    // todo resove console
    console.log(result);

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "Invalid Query Parameters",
        },
        { status: 400 }
      );
    }

    const {username} = result.data
    const Existinguser = await UserModel.findOne({username,isverified:true})
    
    if(Existinguser){
      return Response.json(
        {
          success: false,
          message: "Username is Alrady Taken",
        },
        { status: 400 }
      );
    }


    return Response.json(
      {
        message: "is available username",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in cheaking username", error);
    return Response.json(
      {
        message: "Error in username validation checking plz try again",
        success: false,
      },
      { status: 500 }
    );
  }
}
