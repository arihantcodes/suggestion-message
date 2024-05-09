"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/User";
import axios from "axios";
import { useToast } from "./ui/use-toast";
  
type MessageCardProp = {
    message:Message;
    onMessageDelete:(messageId:string)=>void
}
const page = ({message,onMessageDelete}:MessageCardProp) => {
    const {toast} = useToast()
    const handleDelete =async ()=>{
     const response = await axios.delete(`/api/delete-message/${message._id}`)
     toast({
        title:response.data.message
     })
     onMessageDelete(message._id)
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Suggestion</CardTitle>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </CardHeader>
    </Card>
  );
};

export default page;
