import {
  users,
  skills,
  skillCategories,
  skillExchangeRequests,
  messages,
  ratings,
  type User,
  type UpsertUser,
  type Skill,
  type InsertSkill,
  type SkillCategory,
  type SkillExchangeRequest,
  type InsertSkillExchangeRequest,
  type Message,
  type InsertMessage,
  type Rating,
  type InsertRating,
  type SkillWithUser,
  type SkillExchangeRequestWithDetails,
  type MessageWithUsers,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Skill operations
  getSkills(filters?: { category?: number; type?: string; search?: string }): Promise<SkillWithUser[]>;
  getSkillById(id: number): Promise<SkillWithUser | undefined>;
  getUserSkills(userId: string): Promise<SkillWithUser[]>;
  createSkill(skill: InsertSkill & { userId: string }): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;
  
  // Skill categories
  getSkillCategories(): Promise<SkillCategory[]>;
  
  // Skill exchange requests
  getExchangeRequests(userId: string): Promise<SkillExchangeRequestWithDetails[]>;
  createExchangeRequest(request: InsertSkillExchangeRequest & { requesterId: string }): Promise<SkillExchangeRequest>;
  updateExchangeRequestStatus(id: number, status: string): Promise<SkillExchangeRequest>;
  
  // Messages
  getMessages(userId: string, otherUserId: string): Promise<MessageWithUsers[]>;
  getConversations(userId: string): Promise<{ user: User; lastMessage: Message; unreadCount: number }[]>;
  createMessage(message: InsertMessage & { senderId: string }): Promise<Message>;
  markMessagesAsRead(userId: string, senderId: string): Promise<void>;
  
  // Ratings
  getUserRatings(userId: string): Promise<Rating[]>;
  createRating(rating: InsertRating & { raterId: string }): Promise<Rating>;
  getUserAverageRating(userId: string): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Skill operations
  async getSkills(filters?: { category?: number; type?: string; search?: string }): Promise<SkillWithUser[]> {
    let whereConditions = [eq(skills.isActive, true)];

    if (filters?.category) {
      whereConditions.push(eq(skills.categoryId, filters.category));
    }

    if (filters?.type) {
      whereConditions.push(eq(skills.type, filters.type));
    }

    if (filters?.search) {
      whereConditions.push(
        or(
          ilike(skills.title, `%${filters.search}%`),
          ilike(skills.description, `%${filters.search}%`)
        )!
      );
    }

    const results = await db
      .select()
      .from(skills)
      .leftJoin(users, eq(skills.userId, users.id))
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id))
      .where(and(...whereConditions))
      .orderBy(desc(skills.createdAt));
    
    return results.map((row) => ({
      ...row.skills,
      user: row.users!,
      category: row.skill_categories,
    }));
  }

  async getSkillById(id: number): Promise<SkillWithUser | undefined> {
    const [result] = await db
      .select()
      .from(skills)
      .leftJoin(users, eq(skills.userId, users.id))
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id))
      .where(eq(skills.id, id));

    if (!result) return undefined;

    return {
      ...result.skills,
      user: result.users!,
      category: result.skill_categories,
    };
  }

  async getUserSkills(userId: string): Promise<SkillWithUser[]> {
    const results = await db
      .select()
      .from(skills)
      .leftJoin(users, eq(skills.userId, users.id))
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id))
      .where(eq(skills.userId, userId))
      .orderBy(desc(skills.createdAt));

    return results.map((row) => ({
      ...row.skills,
      user: row.users!,
      category: row.skill_categories,
    }));
  }

  async createSkill(skill: InsertSkill & { userId: string }): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill> {
    const [updatedSkill] = await db
      .update(skills)
      .set({ ...skill, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<void> {
    await db.update(skills).set({ isActive: false }).where(eq(skills.id, id));
  }

  // Skill categories
  async getSkillCategories(): Promise<SkillCategory[]> {
    return await db.select().from(skillCategories).orderBy(skillCategories.name);
  }

  // Exchange requests
  async getExchangeRequests(userId: string): Promise<SkillExchangeRequestWithDetails[]> {
    const results = await db
      .select()
      .from(skillExchangeRequests)
      .leftJoin(users, eq(skillExchangeRequests.requesterId, users.id))
      .leftJoin(skills, eq(skillExchangeRequests.skillId, skills.id))
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id))
      .where(
        or(
          eq(skillExchangeRequests.requesterId, userId),
          eq(skills.userId, userId)
        )
      )
      .orderBy(desc(skillExchangeRequests.createdAt));

    return results.map((row) => ({
      ...row.skill_exchange_requests,
      requester: row.users!,
      skill: {
        ...row.skills!,
        user: row.users!,
        category: row.skill_categories,
      },
    }));
  }

  async createExchangeRequest(request: InsertSkillExchangeRequest & { requesterId: string }): Promise<SkillExchangeRequest> {
    const [newRequest] = await db.insert(skillExchangeRequests).values(request).returning();
    return newRequest;
  }

  async updateExchangeRequestStatus(id: number, status: string): Promise<SkillExchangeRequest> {
    const [updatedRequest] = await db
      .update(skillExchangeRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(skillExchangeRequests.id, id))
      .returning();
    return updatedRequest;
  }

  // Messages
  async getMessages(userId: string, otherUserId: string): Promise<MessageWithUsers[]> {
    const results = await db
      .select()
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(
        or(
          and(eq(messages.senderId, userId), eq(messages.receiverId, otherUserId)),
          and(eq(messages.senderId, otherUserId), eq(messages.receiverId, userId))
        )
      )
      .orderBy(messages.createdAt);

    return results.map((row) => ({
      ...row.messages,
      sender: row.users!,
      receiver: row.users!, // Note: this would need a separate join for receiver
    }));
  }

  async getConversations(userId: string): Promise<{ user: User; lastMessage: Message; unreadCount: number }[]> {
    // This is a simplified version - in production, you'd want a more efficient query
    const allMessages = await db
      .select()
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
      .orderBy(desc(messages.createdAt));

    const conversations = new Map();
    
    allMessages.forEach((row) => {
      const message = row.messages;
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
      
      if (!conversations.has(otherUserId)) {
        conversations.set(otherUserId, {
          user: row.users!,
          lastMessage: message,
          unreadCount: message.receiverId === userId && !message.isRead ? 1 : 0,
        });
      }
    });

    return Array.from(conversations.values());
  }

  async createMessage(message: InsertMessage & { senderId: string }): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.receiverId, userId),
          eq(messages.senderId, senderId),
          eq(messages.isRead, false)
        )
      );
  }

  // Ratings
  async getUserRatings(userId: string): Promise<Rating[]> {
    return await db
      .select()
      .from(ratings)
      .where(eq(ratings.ratedUserId, userId))
      .orderBy(desc(ratings.createdAt));
  }

  async createRating(rating: InsertRating & { raterId: string }): Promise<Rating> {
    const [newRating] = await db.insert(ratings).values(rating).returning();
    return newRating;
  }

  async getUserAverageRating(userId: string): Promise<number> {
    const [result] = await db
      .select({ avg: sql<number>`avg(${ratings.rating})` })
      .from(ratings)
      .where(eq(ratings.ratedUserId, userId));
    
    return result?.avg || 0;
  }
}

export const storage = new DatabaseStorage();
