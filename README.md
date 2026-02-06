# Backend Assignment

## Live Demo
https://your-render-url.onrender.com

---

# Setup Instructions

## 1. Clone repo

git clone <your-repo-url>

cd backend-assignment

## 2. Install dependencies

npm install

## 3. Configure environment variables

Create a `.env` file in root:

DB_HOST=localhost  
DB_USER=root  
DB_PASS=yourpassword  
DB_NAME=test  
DB_PORT=3306  
REDIS_URL=redis://127.0.0.1:6379  

## 4. Run project

npm run dev

Server runs on:
http://localhost:3000

---

# Architecture Overview

This backend follows a layered architecture:

Client  
↓  
Routes Layer (Express routes)  
↓  
Controller Layer (handles requests/responses)  
↓  
Service Layer (business logic, caching, API calls)  
↓  
Data Layer (MySQL + Redis)

Key components:

• Express + TypeScript API server  
• MySQL for persistent storage  
• Redis for caching, rate limiting, and token storage  
• External API integrations  
• OAuth2-style token lifecycle  

---

# Caching Strategy

Redis is used for performance optimization.

## Product API caching
• Product list responses cached by query parameters  
• Cache key includes filters, pagination, and sorting  
• TTL set to 60 seconds  
• Reduces DB load significantly  

## OAuth Token caching
• OAuth tokens cached in Redis  
• TTL based on token expiry  
• Locking mechanism prevents duplicate token fetches  

## Webhook idempotency
• Event IDs stored in Redis  
• Prevents duplicate processing  

---

# Performance Optimizations

• Redis caching for frequently accessed data  
• MySQL connection pooling  
• Cursor-based pagination for large datasets  
• Indexed DB queries  
• Rate limiting to prevent abuse  
• Circuit breaker for external API reliability  
• Retry with exponential backoff for API calls  

These optimizations help achieve low response times and reliability.

---

# Trade-offs Made

• Short cache TTL instead of complex cache invalidation logic  
• Cursor pagination over offset pagination for scalability  
• Mock OAuth provider instead of real provider for simplicity  
• Limited DB normalization to keep queries fast  
• Basic rate limiting instead of distributed quota system  

---

# Features Implemented

• Product listing API  
• Pagination, filtering, sorting, search  
• OAuth2 client credentials flow  
• Token lifecycle management  
• External API integration  
• Webhook handling with idempotency  
• Rate limiting  
• Circuit breaker pattern  

---

# Author
Yash Kaushal

Your Name
