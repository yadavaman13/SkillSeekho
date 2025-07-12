import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Search, 
  Handshake, 
  Star, 
  Users, 
  Smartphone, 
  MessageSquare,
  Code,
  Palette,
  Languages,
  Music,
  TrendingUp,
  Dumbbell,
  Camera,
  ChefHat,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const skillCategories = [
    { icon: Code, name: "Programming", color: "text-blue-500 bg-blue-50", skills: ["JavaScript", "Python", "React"] },
    { icon: Palette, name: "Design", color: "text-green-500 bg-green-50", skills: ["Photoshop", "Figma", "Illustrator"] },
    { icon: Languages, name: "Languages", color: "text-yellow-500 bg-yellow-50", skills: ["English", "Spanish", "French"] },
    { icon: Music, name: "Music", color: "text-purple-500 bg-purple-50", skills: ["Guitar", "Piano", "Voice"] },
    { icon: TrendingUp, name: "Business", color: "text-green-500 bg-green-50", skills: ["Marketing", "Sales", "Strategy"] },
    { icon: Dumbbell, name: "Fitness", color: "text-red-500 bg-red-50", skills: ["Yoga", "Cardio", "Strength"] },
    { icon: Camera, name: "Photography", color: "text-indigo-500 bg-indigo-50", skills: ["Portrait", "Landscape", "Editing"] },
    { icon: ChefHat, name: "Cooking", color: "text-orange-500 bg-orange-50", skills: ["Baking", "Italian", "Asian"] },
  ];

  const featuredTeachers = [
    {
      name: "Sarah Johnson",
      title: "UX Designer",
      bio: "Teaching Figma and user experience design. Looking to learn Spanish conversation.",
      rating: 4.9,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c133?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Alex Chen",
      title: "Full Stack Developer",
      bio: "Expert in React and Node.js. Want to learn guitar and music theory fundamentals.",
      rating: 4.8,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Maria Rodriguez",
      title: "Language Teacher",
      bio: "Native Spanish speaker and certified teacher. Interested in learning photography techniques.",
      rating: 5.0,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
  ];

  const testimonials = [
    {
      text: "I learned React from Alex while teaching him guitar. It's amazing how much you can accomplish when both people are motivated to learn!",
      author: "Lisa Thompson",
      role: "Music Teacher",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "The skill matching system is fantastic. I found the perfect exchange partner within days and we've been learning together for months now.",
      author: "Michael Chang",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "SkillSeekho helped me improve my English while sharing my native language. The community is so supportive and friendly.",
      author: "Ana Gutierrez",
      role: "Language Exchange Partner",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold text-gray-900">SkillSeekho</span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 font-medium">Browse Skills</a>
                <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 font-medium">Teach a Skill</a>
                <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 font-medium">How it Works</a>
                <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 font-medium">Community</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = '/api/login'}>
                Sign In
              </Button>
              <Button onClick={() => window.location.href = '/api/login'}>
                Get Started
              </Button>
            </div>

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
              <a href="#" className="block text-gray-900 hover:text-primary py-2 font-medium">Browse Skills</a>
              <a href="#" className="block text-gray-600 hover:text-primary py-2 font-medium">Teach a Skill</a>
              <a href="#" className="block text-gray-600 hover:text-primary py-2 font-medium">How it Works</a>
              <a href="#" className="block text-gray-600 hover:text-primary py-2 font-medium">Community</a>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => window.location.href = '/api/login'}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={() => window.location.href = '/api/login'}>
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Learn, Teach, and <span className="text-accent">Grow Together</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect with skilled individuals to exchange knowledge. Whether you're learning coding, design, languages, or any skill - find your perfect learning partner.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-accent hover:bg-amber-600" onClick={() => window.location.href = '/api/login'}>
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/api/login'}>
                  Teach a Skill
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Diverse group of professionals collaborating" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SkillSeekho?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes skill exchange simple, secure, and rewarding for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-gray-600">Advanced filtering helps you find the perfect skill exchange partner based on your interests and availability.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Exchange</h3>
                <p className="text-gray-600">Built-in request and approval system ensures both parties agree before any skill exchange begins.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Feedback</h3>
                <p className="text-gray-600">Post-session ratings and reviews help maintain high-quality exchanges and build trust in our community.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
                <p className="text-gray-600">Join a vibrant community of learners and teachers who are passionate about sharing knowledge.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">Access the platform seamlessly from any device - desktop, tablet, or mobile phone.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Communication</h3>
                <p className="text-gray-600">Built-in messaging system allows for smooth communication between skill exchange partners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Skills to Exchange
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most sought-after skills in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <Card key={category.name} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${category.color} mr-3`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {category.name === "Programming" && "Learn coding languages, frameworks, and development best practices."}
                    {category.name === "Design" && "Master graphic design, UI/UX, and creative visual communication."}
                    {category.name === "Languages" && "Practice conversation and improve fluency with native speakers."}
                    {category.name === "Music" && "Learn instruments, music theory, and composition techniques."}
                    {category.name === "Business" && "Develop entrepreneurial skills, marketing, and business strategy."}
                    {category.name === "Fitness" && "Get fit with personal training, yoga, and wellness coaching."}
                    {category.name === "Photography" && "Master camera techniques, editing, and visual storytelling."}
                    {category.name === "Cooking" && "Learn culinary skills, recipes, and cooking techniques."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className={category.color}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SkillSeekho Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with skill exchange in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600 mb-6">Sign up and list the skills you want to teach and learn. Add details about your experience and availability.</p>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" 
                alt="Person creating profile on laptop" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>

            <div className="text-center">
              <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Your Match</h3>
              <p className="text-gray-600 mb-6">Browse through skill listings and find someone who teaches what you want to learn and needs what you can teach.</p>
              <img 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop" 
                alt="Two people discussing and looking at tablet" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>

            <div className="text-center">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Learning</h3>
              <p className="text-gray-600 mb-6">Connect with your match, schedule sessions, and start your skill exchange journey. Rate and review after each session.</p>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
                alt="Mentor teaching student with books and laptop" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Teachers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our amazing community members who are sharing their expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTeachers.map((teacher) => (
              <Card key={teacher.name} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="text-gray-600">{teacher.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{teacher.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">{teacher.rating} ({teacher.reviews} reviews)</span>
                    </div>
                    <Button size="sm" onClick={() => window.location.href = '/api/login'}>
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who've transformed their skills through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="bg-gray-50 p-6">
                <CardContent className="p-0">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Skill Exchange Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of learners and teachers who are already growing their skills through collaborative exchange.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={() => window.location.href = '/api/login'}>
              Join as a Learner
            </Button>
            <Button size="lg" className="bg-accent hover:bg-amber-600" onClick={() => window.location.href = '/api/login'}>
              Start Teaching
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold">SkillSeekho</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting learners and teachers worldwide through collaborative skill exchange.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Browse Skills</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Teach a Skill</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">How it Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community Forum</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SkillSeekho. All rights reserved. Made with 💙 for the learning community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
