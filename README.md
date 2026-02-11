#Farmlokal Backend Assignment

## Live Demo
https://farmlokal-5rpr.onrender.com/health
https://farmlokal-5rpr.onrender.com/products
https://farmlokal-5rpr.onrender.com/token

---

# Setup Instructions

## 1. Clone repo

```bash
git clone 
````
```bash
cd farmlokal
````
## 2. Install dependencies
```bash
npm install
````
## 3. Configure environment variables

Create a `.env` file in root:
```bash
DB_HOST=localhost  
DB_USER=root  
DB_PASS=yourpassword  
DB_NAME=test  
DB_PORT=3306  
REDIS_URL=redis://default:password@grown-dodo-48089.upstash.io:6379
````
## 4. Run project
```bash
npm run dev
````
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

---

# Focus Areas
I focused primarily on Redis caching and deployment reliability, as these have the biggest real-world impact on backend performance and scalability.

A major part of my effort went into implementing Redis correctly for caching tokens and product responses. This included handling TTLs, avoiding redundant calls, and ensuring cache usage actually reduced database load. Getting Redis working securely with a managed provider and handling permission/configuration issues helped me understand real-world caching challenges beyond local development.

I also spent significant time on deployment and environment configuration. Setting up the service on Render, integrating a cloud MySQL database, and connecting a managed Redis instance required careful handling of environment variables, networking, and production settings. This ensured the API runs reliably in a real cloud environment rather than just locally.

Overall I prioritized areas that directly affect performance, scalability, and production readiness, since those are critical in real backend systems.

# Author
Yash Kaushal





