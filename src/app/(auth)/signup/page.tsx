"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schema/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/APiresponse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  { Loader2Icon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const page = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);

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
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username?username=${username}`
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
  }, [username]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmiting(true);
    try {
      const response = await axios.post(`api/signup`, data);
      console.log(response);
      toast({
        title: "Account Create Succesfully",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in Signup");
      toast({
        title: "Account Creation Failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value)
                    }}
                  />
                </FormControl>
                {isCheckingUsername && <Loader2Icon className="animate-spin"/>}
                <p className={`text-sm ${usernameMessage === 'is available username' ?'text-green-500 font-medium':'text-red-500'}`}>
                 {username}  {usernameMessage}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
              
                  />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                 
                  />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" disabled={isSubmiting} className="w-full mt-4">
              Create an account
            </Button>
        </form>
      </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
     
    </>
  );
};

export default page;
