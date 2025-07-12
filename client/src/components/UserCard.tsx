import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Star, MessageSquare, User as UserIcon } from "lucide-react";
import { Link } from "wouter";
import type { User } from "@shared/schema";

interface UserCardProps {
  user: User;
  averageRating?: number;
  reviewCount?: number;
  skills?: string[];
  className?: string;
}

export default function UserCard({ 
  user, 
  averageRating, 
  reviewCount, 
  skills = [],
  className = ""
}: UserCardProps) {
  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || user.email;

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={user.profileImageUrl || undefined} alt={displayName} />
            <AvatarFallback className="text-lg">
              {user.firstName ? user.firstName[0] : user.email[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{displayName}</h3>
            {user.location && (
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </div>
            )}
            {averageRating && averageRating > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(averageRating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span>{averageRating.toFixed(1)}</span>
                {reviewCount && (
                  <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
                )}
              </div>
            )}
          </div>
        </div>

        {user.bio && (
          <p className="text-gray-600 mb-4 line-clamp-3">{user.bio}</p>
        )}

        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <Link to={`/profile/${user.id}`}>
              <Button variant="outline" size="sm">
                <UserIcon className="h-4 w-4 mr-1" />
                Profile
              </Button>
            </Link>
            <Link to={`/messages/${user.id}`}>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
