import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { MapPin, Clock, User } from "lucide-react";
import type { SkillWithUser } from "@shared/schema";

interface SkillCardProps {
  skill: SkillWithUser;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const typeColors = {
    teach: "bg-blue-100 text-blue-800",
    learn: "bg-purple-100 text-purple-800",
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={typeColors[skill.type as keyof typeof typeColors]}>
            {skill.type === "teach" ? "Teaching" : "Learning"}
          </Badge>
          <Badge variant="outline" className={levelColors[skill.level as keyof typeof levelColors]}>
            {skill.level}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{skill.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{skill.description}</p>
        
        {skill.category && (
          <div className="flex items-center mb-3">
            <span className="text-sm text-gray-500">Category: {skill.category.name}</span>
          </div>
        )}

        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={skill.user.profileImageUrl || undefined} />
            <AvatarFallback>
              {skill.user.firstName ? skill.user.firstName[0] : skill.user.email[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {skill.user.firstName || skill.user.email}
            </p>
            {skill.user.location && (
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {skill.user.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {new Date(skill.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {skill.user.firstName || "Anonymous"}
          </div>
        </div>

        <div className="flex space-x-2">
          <Link to={`/skills/${skill.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/profile/${skill.user.id}`}>
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
