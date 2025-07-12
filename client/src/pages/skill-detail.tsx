import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  User, 
  MessageSquare, 
  HandHeart,
  Star,
  ArrowLeft,
  Clock
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function SkillDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [requestMessage, setRequestMessage] = useState("");

  const { data: skill, isLoading } = useQuery({
    queryKey: ["/api/skills", id],
    enabled: !!id,
  });

  const { data: userRating } = useQuery({
    queryKey: ["/api/users", skill?.user.id, "average-rating"],
    enabled: !!skill?.user.id,
  });

  const requestMutation = useMutation({
    mutationFn: async (data: { skillId: number; message: string }) => {
      await apiRequest("POST", "/api/exchange-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your skill exchange request has been sent!",
      });
      setRequestMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/exchange-requests"] });
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
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendRequest = () => {
    if (!skill || !user) return;

    if (skill.user.id === user.id) {
      toast({
        title: "Error",
        description: "You cannot send a request to yourself.",
        variant: "destructive",
      });
      return;
    }

    requestMutation.mutate({
      skillId: skill.id,
      message: requestMessage.trim(),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill not found</h2>
              <p className="text-gray-600 mb-6">The skill you're looking for doesn't exist or has been removed.</p>
              <Link to="/skills">
                <Button>Back to Skills</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const typeColors = {
    teach: "bg-blue-100 text-blue-800",
    learn: "bg-purple-100 text-purple-800",
  };

  const isOwnSkill = user?.id === skill.user.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/skills")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={typeColors[skill.type as keyof typeof typeColors]}>
                      {skill.type === "teach" ? "Teaching" : "Learning"}
                    </Badge>
                    <Badge variant="outline" className={levelColors[skill.level as keyof typeof levelColors]}>
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(skill.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-2xl">{skill.title}</CardTitle>
                {skill.category && (
                  <p className="text-gray-600">Category: {skill.category.name}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{skill.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {skill.type === "teach" ? "Teacher" : "Learner"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={skill.user.profileImageUrl || undefined} />
                    <AvatarFallback>
                      {skill.user.firstName ? skill.user.firstName[0] : skill.user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{skill.user.firstName || skill.user.email}</h4>
                    {skill.user.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {skill.user.location}
                      </div>
                    )}
                  </div>
                </div>

                {userRating && (
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{userRating.averageRating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">average rating</span>
                  </div>
                )}

                {skill.user.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">{skill.user.bio}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Link to={`/profile/${skill.user.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  {!isOwnSkill && (
                    <Link to={`/messages/${skill.user.id}`}>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Request Exchange */}
            {!isOwnSkill && user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HandHeart className="h-5 w-5 mr-2" />
                    Request Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Introduce yourself and explain why you're interested in this skill exchange..."
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                    <Button
                      onClick={handleSendRequest}
                      disabled={requestMutation.isPending}
                      className="w-full"
                    >
                      {requestMutation.isPending ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <HandHeart className="h-4 w-4 mr-2" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skill Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <Badge className={typeColors[skill.type as keyof typeof typeColors]}>
                    {skill.type === "teach" ? "Teaching" : "Learning"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <Badge variant="outline" className={levelColors[skill.level as keyof typeof levelColors]}>
                    {skill.level}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="text-sm">{new Date(skill.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span className="text-sm">{new Date(skill.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
