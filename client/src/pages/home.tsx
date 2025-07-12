import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, MessageSquare, TrendingUp, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/skills", selectedCategory === "all" ? undefined : selectedCategory, selectedType === "all" ? undefined : selectedType, searchTerm || undefined],
    enabled: !!user,
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/skill-categories"],
    enabled: !!user,
  });

  const { data: exchangeRequests } = useQuery({
    queryKey: ["/api/exchange-requests"],
    enabled: !!user,
  });

  const { data: userSkills } = useQuery({
    queryKey: ["/api/users", user?.id, "skills"],
    enabled: !!user,
  });

  const stats = {
    totalSkills: userSkills?.length || 0,
    activeExchanges: exchangeRequests?.filter((req: any) => req.status === "accepted").length || 0,
    pendingRequests: exchangeRequests?.filter((req: any) => req.status === "pending").length || 0,
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName || user.email}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to learn something new or share your expertise today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSkills}</p>
                  <p className="text-gray-600">Your Skills</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-secondary mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeExchanges}</p>
                  <p className="text-gray-600">Active Exchanges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-accent mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                  <p className="text-gray-600">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/create-skill">
                <Button className="w-full justify-start">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Skill Listing
                </Button>
              </Link>
              <Link to="/skills">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Skills
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {exchangeRequests && exchangeRequests.length > 0 ? (
                <div className="space-y-3">
                  {exchangeRequests.slice(0, 3).map((request: any) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{request.skill.title}</p>
                        <p className="text-sm text-gray-600">
                          {request.status === "pending" ? "Pending approval" : 
                           request.status === "accepted" ? "Exchange accepted" : "Request declined"}
                        </p>
                      </div>
                      <Badge variant={request.status === "accepted" ? "default" : "secondary"}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Skills Browser */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Discover Skills</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="teach">Teaching</SelectItem>
                  <SelectItem value="learn">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
                ))}
              </div>
            ) : skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.slice(0, 6).map((skill: any) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No skills found matching your criteria.</p>
                <Link to="/create-skill">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Be the first to post a skill
                  </Button>
                </Link>
              </div>
            )}
            
            {skills && skills.length > 6 && (
              <div className="text-center mt-6">
                <Link to="/skills">
                  <Button variant="outline">View All Skills</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
