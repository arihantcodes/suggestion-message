"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm ,SubmitHandler} from "react-hook-form";
import { z } from "zod";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schema/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/APiresponse";

const page = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debounceUsername = useDebounceValue(username, 300);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkusername = async () => {
      if (debounceUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username?username=${debounceUsername}`
          );

          console.log(response);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking in username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkusername();
  }, [debounceUsername]);

 const onSubmit = async (data:z.infer<typeof SignUpSchema>) =>{
  setIsSubmiting(true)
  try {
    const response = await axios.post(`api/signin`)
  } catch (error) {
    
  }
 }

  return <div>page</div>;
}; 

export default page;
