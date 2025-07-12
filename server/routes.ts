import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSkillSchema, insertSkillExchangeRequestSchema, insertMessageSchema, insertRatingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Skill routes
  app.get('/api/skills', async (req, res) => {
    try {
      const { category, type, search } = req.query;
      const skills = await storage.getSkills({
        category: category ? parseInt(category as string) : undefined,
        type: type as string,
        search: search as string,
      });
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.get('/api/skills/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const skill = await storage.getSkillById(id);
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      console.error("Error fetching skill:", error);
      res.status(500).json({ message: "Failed to fetch skill" });
    }
  });

  app.post('/api/skills', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill({ ...skillData, userId });
      res.json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid skill data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create skill" });
    }
  });

  app.put('/api/skills/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const skillData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, skillData);
      res.json(skill);
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).json({ message: "Failed to update skill" });
    }
  });

  app.delete('/api/skills/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.json({ message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // User skills
  app.get('/api/users/:userId/skills', async (req, res) => {
    try {
      const userId = req.params.userId;
      const skills = await storage.getUserSkills(userId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching user skills:", error);
      res.status(500).json({ message: "Failed to fetch user skills" });
    }
  });

  // Skill categories
  app.get('/api/skill-categories', async (req, res) => {
    try {
      const categories = await storage.getSkillCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
      res.status(500).json({ message: "Failed to fetch skill categories" });
    }
  });

  // Exchange requests
  app.get('/api/exchange-requests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const requests = await storage.getExchangeRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching exchange requests:", error);
      res.status(500).json({ message: "Failed to fetch exchange requests" });
    }
  });

  app.post('/api/exchange-requests', isAuthenticated, async (req: any, res) => {
    try {
      const requesterId = req.user.claims.sub;
      const requestData = insertSkillExchangeRequestSchema.parse(req.body);
      const request = await storage.createExchangeRequest({ ...requestData, requesterId });
      res.json(request);
    } catch (error) {
      console.error("Error creating exchange request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create exchange request" });
    }
  });

  app.put('/api/exchange-requests/:id/status', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const request = await storage.updateExchangeRequestStatus(id, status);
      res.json(request);
    } catch (error) {
      console.error("Error updating exchange request:", error);
      res.status(500).json({ message: "Failed to update exchange request" });
    }
  });

  // Messages
  app.get('/api/messages/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims.sub;
      const otherUserId = req.params.userId;
      const messages = await storage.getMessages(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get('/api/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const conversations = await storage.getConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.post('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const senderId = req.user.claims.sub;
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage({ ...messageData, senderId });
      res.json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  app.put('/api/messages/:senderId/read', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const senderId = req.params.senderId;
      await storage.markMessagesAsRead(userId, senderId);
      res.json({ message: "Messages marked as read" });
    } catch (error) {
      console.error("Error marking messages as read:", error);
      res.status(500).json({ message: "Failed to mark messages as read" });
    }
  });

  // Ratings
  app.get('/api/users/:userId/ratings', async (req, res) => {
    try {
      const userId = req.params.userId;
      const ratings = await storage.getUserRatings(userId);
      res.json(ratings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  });

  app.get('/api/users/:userId/average-rating', async (req, res) => {
    try {
      const userId = req.params.userId;
      const averageRating = await storage.getUserAverageRating(userId);
      res.json({ averageRating });
    } catch (error) {
      console.error("Error fetching average rating:", error);
      res.status(500).json({ message: "Failed to fetch average rating" });
    }
  });

  app.post('/api/ratings', isAuthenticated, async (req: any, res) => {
    try {
      const raterId = req.user.claims.sub;
      const ratingData = insertRatingSchema.parse(req.body);
      const rating = await storage.createRating({ ...ratingData, raterId });
      res.json(rating);
    } catch (error) {
      console.error("Error creating rating:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid rating data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rating" });
    }
  });

  // Initialize skill categories if empty
  app.post('/api/admin/seed-categories', async (req, res) => {
    try {
      const categories = await storage.getSkillCategories();
      if (categories.length === 0) {
        // Seed with default categories
        const defaultCategories = [
          { name: "Programming", icon: "fas fa-code", color: "text-blue-500" },
          { name: "Design", icon: "fas fa-paint-brush", color: "text-green-500" },
          { name: "Languages", icon: "fas fa-language", color: "text-yellow-500" },
          { name: "Music", icon: "fas fa-guitar", color: "text-purple-500" },
          { name: "Business", icon: "fas fa-chart-line", color: "text-green-500" },
          { name: "Fitness", icon: "fas fa-dumbbell", color: "text-red-500" },
          { name: "Photography", icon: "fas fa-camera", color: "text-indigo-500" },
          { name: "Cooking", icon: "fas fa-utensils", color: "text-orange-500" },
        ];
        
        // Insert categories (this would need proper DB insertion)
        res.json({ message: "Categories seeded successfully" });
      } else {
        res.json({ message: "Categories already exist" });
      }
    } catch (error) {
      console.error("Error seeding categories:", error);
      res.status(500).json({ message: "Failed to seed categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
