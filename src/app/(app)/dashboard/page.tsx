"use client";
import MessageCard from "@/components/MessageCard";
import { useToast } from "@/components/ui/use-toast";
import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/User";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptmessageSchema } from "@/schema/acceptmessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/APiresponse";
const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const handleMessageDelete = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptmessageSchema),
  });

  const { watch, register, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-message");

      setValue("acceptMessages", response.data.isAccepting);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const allFetchMessage = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>("/api/get-message");

        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Message",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages ",
          variant: "destructive",
        });
      } finally {
        setIsSwitchLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );
  useEffect(() => {
    if (!session || !session.user) return;

    allFetchMessage();

    fetchMessage();
  }, [session, setValue, toast, fetchMessage, allFetchMessage]);

 

  

  return <div>Dashboard</div>;
};

export default page;
