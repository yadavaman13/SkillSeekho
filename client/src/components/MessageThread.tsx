import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import type { User, MessageWithUsers } from "@shared/schema";

interface MessageThreadProps {
  otherUser: User;
  className?: string;
}

export default function MessageThread({ otherUser, className = "" }: MessageThreadProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["/api/messages", otherUser.id],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { receiverId: string; content: string }) => {
      await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/messages", otherUser.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("PUT", `/api/messages/${otherUser.id}/read`, {});
    },
  });

  useEffect(() => {
    // Mark messages as read when component mounts
    markAsReadMutation.mutate();
  }, [otherUser.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    sendMessageMutation.mutate({
      receiverId: otherUser.id,
      content: message.trim(),
    });
  };

  const otherUserName = otherUser.firstName && otherUser.lastName 
    ? `${otherUser.firstName} ${otherUser.lastName}`
    : otherUser.firstName || otherUser.email;

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={otherUser.profileImageUrl || undefined} />
            <AvatarFallback>
              {otherUser.firstName ? otherUser.firstName[0] : otherUser.email[0]}
            </AvatarFallback>
          </Avatar>
          {otherUserName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg: MessageWithUsers) => {
                const isFromCurrentUser = msg.senderId === user?.id;
                const messageTime = new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isFromCurrentUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        isFromCurrentUser ? 'text-primary-foreground/70' : 'text-gray-500'
                      }`}>
                        {messageTime}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <p>No messages yet.</p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button 
              type="submit" 
              disabled={!message.trim() || sendMessageMutation.isPending}
              size="sm"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
