import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  GraduationCap, 
  Menu, 
  X, 
  Home, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut
} from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse Skills", href: "/skills", icon: Search },
    { name: "Create Skill", href: "/create-skill", icon: PlusCircle },
    { name: "Messages", href: "/messages", icon: MessageSquare },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-900">SkillSeekho</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="flex items-center"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || user.email} />
                      <AvatarFallback>
                        {user.firstName ? user.firstName[0] : user.email[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.firstName || user.email}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => window.location.href = "/api/login"}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
            
            {isAuthenticated && user ? (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Button className="w-full" onClick={() => window.location.href = "/api/login"}>
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
