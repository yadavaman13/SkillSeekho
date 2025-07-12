# SkillSeekho - Skill Exchange Platform

## Overview

SkillSeekho is a collaborative skill-exchange platform built with React, TypeScript, and Express.js. Users can connect with others to teach and learn new skills across various categories like programming, design, languages, music, and more. The platform enables users to create skill offerings (teaching or learning), send exchange requests, and communicate through an integrated messaging system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and build processes
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage

## Key Components

### Authentication System
- Replit Auth integration using OpenID Connect
- Session-based authentication with PostgreSQL session storage
- User profile management with OAuth user data
- Protected routes requiring authentication

### Database Schema
- **Users**: Profile information, authentication data
- **Skills**: Skill offerings with categories, levels, and descriptions
- **Skill Categories**: Predefined categories for organizing skills
- **Exchange Requests**: Requests between users to learn/teach skills
- **Messages**: Direct messaging between users
- **Ratings**: User rating system for skill exchanges

### Core Features
- **Skill Management**: Create, browse, and filter skills by category and type
- **Exchange System**: Send and manage skill exchange requests
- **Messaging**: Real-time messaging between users
- **User Profiles**: View user profiles with skills and ratings
- **Search & Filter**: Advanced filtering by category, skill type, and search terms

## Data Flow

1. **User Registration/Login**: Users authenticate through Replit Auth
2. **Skill Creation**: Authenticated users create skill offerings
3. **Skill Discovery**: Users browse and search available skills
4. **Exchange Requests**: Users send requests to learn from or teach others
5. **Messaging**: Users communicate through the integrated messaging system
6. **Rating System**: Users rate their experiences after skill exchanges

## External Dependencies

### Database
- **Neon**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database operations
- **Connection**: Uses connection pooling with `@neondatabase/serverless`

### Authentication
- **Replit Auth**: OAuth provider integration
- **OpenID Connect**: Standard authentication protocol
- **Session Storage**: PostgreSQL-based session management

### UI Components
- **Radix UI**: Headless UI components for accessibility
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Environment**: Replit development environment
- **Hot Reload**: Vite HMR for frontend changes
- **Database**: Neon development database instance
- **Sessions**: PostgreSQL session storage

### Production Build
- **Frontend**: Vite build process creates optimized static assets
- **Backend**: ESBuild bundles server code for Node.js execution
- **Database**: Production PostgreSQL instance via Neon
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPLIT_DOMAINS

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption
- `REPLIT_DOMAINS`: Allowed domains for CORS
- `ISSUER_URL`: OpenID Connect issuer URL
- `REPL_ID`: Replit application identifier

The application uses a monorepo structure with shared TypeScript schemas between frontend and backend, ensuring type safety across the entire application stack.