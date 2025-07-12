import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  bio: text("bio"),
  location: varchar("location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Skill categories
export const skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Skills that users can teach or want to learn
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  categoryId: integer("category_id").references(() => skillCategories.id),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  level: varchar("level", { length: 20 }).notNull(), // beginner, intermediate, advanced
  type: varchar("type", { length: 10 }).notNull(), // teach, learn
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Skill exchange requests
export const skillExchangeRequests = pgTable("skill_exchange_requests", {
  id: serial("id").primaryKey(),
  requesterId: varchar("requester_id").notNull().references(() => users.id),
  skillId: integer("skill_id").notNull().references(() => skills.id),
  message: text("message"),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages between users
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  exchangeRequestId: integer("exchange_request_id").references(() => skillExchangeRequests.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Ratings and reviews
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  raterId: varchar("rater_id").notNull().references(() => users.id),
  ratedUserId: varchar("rated_user_id").notNull().references(() => users.id),
  exchangeRequestId: integer("exchange_request_id").references(() => skillExchangeRequests.id),
  rating: integer("rating").notNull(), // 1-5
  review: text("review"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  skills: many(skills),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  exchangeRequests: many(skillExchangeRequests),
  ratingsGiven: many(ratings, { relationName: "ratingsGiven" }),
  ratingsReceived: many(ratings, { relationName: "ratingsReceived" }),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
  user: one(users, { fields: [skills.userId], references: [users.id] }),
  category: one(skillCategories, { fields: [skills.categoryId], references: [skillCategories.id] }),
  exchangeRequests: many(skillExchangeRequests),
}));

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}));

export const skillExchangeRequestsRelations = relations(skillExchangeRequests, ({ one, many }) => ({
  requester: one(users, { fields: [skillExchangeRequests.requesterId], references: [users.id] }),
  skill: one(skills, { fields: [skillExchangeRequests.skillId], references: [skills.id] }),
  messages: many(messages),
  ratings: many(ratings),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id], relationName: "sentMessages" }),
  receiver: one(users, { fields: [messages.receiverId], references: [users.id], relationName: "receivedMessages" }),
  exchangeRequest: one(skillExchangeRequests, { fields: [messages.exchangeRequestId], references: [skillExchangeRequests.id] }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  rater: one(users, { fields: [ratings.raterId], references: [users.id], relationName: "ratingsGiven" }),
  ratedUser: one(users, { fields: [ratings.ratedUserId], references: [users.id], relationName: "ratingsReceived" }),
  exchangeRequest: one(skillExchangeRequests, { fields: [ratings.exchangeRequestId], references: [skillExchangeRequests.id] }),
}));

// Insert schemas
export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSkillExchangeRequestSchema = createInsertSchema(skillExchangeRequests).omit({
  id: true,
  requesterId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  senderId: true,
  createdAt: true,
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  raterId: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type SkillCategory = typeof skillCategories.$inferSelect;
export type SkillExchangeRequest = typeof skillExchangeRequests.$inferSelect;
export type InsertSkillExchangeRequest = z.infer<typeof insertSkillExchangeRequestSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;

// Extended types for API responses
export type SkillWithUser = Skill & {
  user: User;
  category: SkillCategory | null;
};

export type SkillExchangeRequestWithDetails = SkillExchangeRequest & {
  requester: User;
  skill: SkillWithUser;
};

export type MessageWithUsers = Message & {
  sender: User;
  receiver: User;
};

export type RatingWithUsers = Rating & {
  rater: User;
  ratedUser: User;
};
