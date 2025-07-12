import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import MessageThread from "@/components/MessageThread";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, Users, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { User } from "@shared/schema";

export default function Messages() {
  const { userId } = useParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ["/api/conversations"],
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: chatUser } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to view messages.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  useEffect(() => {
    if (chatUser) {
      setSelectedUser(chatUser);
    }
  }, [chatUser]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 bg-white rounded-lg shadow h-96"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredConversations = conversations?.filter((conv: any) => {
    const userName = conv.user.firstName && conv.user.lastName 
      ? `${conv.user.firstName} ${conv.user.lastName}`
      : conv.user.firstName || conv.user.email;
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-gray-600">
            Connect with other users to discuss skill exchanges and collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {conversationsLoading ? (
                <div className="p-4 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {filteredConversations.map((conversation: any) => {
                    const userName = conversation.user.firstName && conversation.user.lastName 
                      ? `${conversation.user.firstName} ${conversation.user.lastName}`
                      : conversation.user.firstName || conversation.user.email;
                    
                    const isActive = selectedUser?.id === conversation.user.id;
                    const messageTime = new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div
                        key={conversation.user.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          isActive ? 'bg-blue-50 border-r-4 border-r-primary' : ''
                        }`}
                        onClick={() => setSelectedUser(conversation.user)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.profileImageUrl || undefined} />
                            <AvatarFallback>
                              {conversation.user.firstName ? conversation.user.firstName[0] : conversation.user.email[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 truncate">{userName}</p>
                              <span className="text-xs text-gray-500">{messageTime}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage.content}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="ml-2">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                  <p>No conversations yet</p>
                  <p className="text-sm">Start by browsing skills and connecting with other users</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <MessageThread 
                otherUser={selectedUser} 
                className="h-[600px]"
              />
            ) : (
              <Card className="h-[600px]">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p>Choose a conversation from the list to start messaging</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
