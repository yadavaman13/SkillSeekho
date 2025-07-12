import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import SkillCard from "@/components/SkillCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Star, 
  MessageSquare, 
  BookOpen, 
  GraduationCap,
  User,
  Settings
} from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  
  // If no userId provided, show current user's profile
  const profileUserId = userId || currentUser?.id;
  const isOwnProfile = !userId || userId === currentUser?.id;

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users", profileUserId],
    enabled: !!profileUserId,
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/users", profileUserId, "skills"],
    enabled: !!profileUserId,
  });

  const { data: ratings } = useQuery({
    queryKey: ["/api/users", profileUserId, "ratings"],
    enabled: !!profileUserId,
  });

  const { data: averageRating } = useQuery({
    queryKey: ["/api/users", profileUserId, "average-rating"],
    enabled: !!profileUserId,
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
              <p className="text-gray-600">The user you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const teachingSkills = skills?.filter((skill: any) => skill.type === "teach") || [];
  const learningSkills = skills?.filter((skill: any) => skill.type === "learn") || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImageUrl || undefined} />
                <AvatarFallback className="text-2xl">
                  {user.firstName ? user.firstName[0] : user.email[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user.firstName || user.email}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {user.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  
                  {averageRating && averageRating.averageRating > 0 && (
                    <div className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {averageRating.averageRating.toFixed(1)} average rating
                    </div>
                  )}
                </div>
                
                {user.bio && (
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                )}
                
                <div className="flex space-x-3">
                  {isOwnProfile ? (
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Link to={`/messages/${user.id}`}>
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </Link>
                      <Button variant="outline">
                        View Skills
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{teachingSkills.length}</p>
              <p className="text-gray-600">Teaching Skills</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{learningSkills.length}</p>
              <p className="text-gray-600">Learning Skills</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{ratings?.length || 0}</p>
              <p className="text-gray-600">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills and Reviews */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="space-y-6">
                {skillsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {teachingSkills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          Teaching Skills ({teachingSkills.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {teachingSkills.map((skill: any) => (
                            <SkillCard key={skill.id} skill={skill} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {learningSkills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          Learning Skills ({learningSkills.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {learningSkills.map((skill: any) => (
                            <SkillCard key={skill.id} skill={skill} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {(!skills || skills.length === 0) && (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {isOwnProfile ? "You haven't created any skills yet." : "No skills posted yet."}
                        </p>
                        {isOwnProfile && (
                          <Link to="/create-skill">
                            <Button className="mt-4">Create Your First Skill</Button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                {ratings && ratings.length > 0 ? (
                  <div className="space-y-4">
                    {ratings.map((rating: any) => (
                      <Card key={rating.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < rating.rating ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                            <span className="font-medium">{rating.rating}/5</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(rating.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {rating.review && (
                          <p className="text-gray-700">{rating.review}</p>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reviews yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
