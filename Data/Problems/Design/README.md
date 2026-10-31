# Design Interview Problems

**60 problems** in 4 categories.

Design problems that come up in interviews, one markdown file per problem, grouped by category. Each file has a fixed header (`**Category:**`, `**Difficulty:**`, `**Seniority:**`, `**Companies:**`, `**Tags:**`, `**Time:**`) and the same sections: Problem Statement, Clarifying Questions, Requirements, category-specific solution sections, Trade-offs, Follow-up Questions, Common Mistakes, Key Takeaways.

The app (`app/`) reads these files directly. They appear on the **Design** page and the chat agents can use them (search, coaching, mock design interviews). This README and files starting with `_` are skipped.

## System Design (15)

Distributed backend systems: scale, storage, consistency, caching, queues.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Distributed Unique ID Generator](<System Design/Distributed Unique ID Generator.md>) | Easy | mid | 45 min | Twitter, Instagram, Discord, Amazon |
| [Pastebin](<System Design/Pastebin.md>) | Easy | mid | 45 min | Amazon, Microsoft, Google, Dropbox |
| [URL Shortener](<System Design/URL Shortener.md>) | Easy | mid | 45 min | Google, Amazon, Microsoft, Bitly |
| [Chat System](<System Design/Chat System.md>) | Medium | senior | 45 min | Meta, WhatsApp, Slack, Discord |
| [News Feed](<System Design/News Feed.md>) | Medium | senior | 45 min | Meta, Twitter, LinkedIn, Instagram |
| [Notification System](<System Design/Notification System.md>) | Medium | senior | 45 min | Amazon, Meta, Uber, LinkedIn |
| [Proximity Service](<System Design/Proximity Service.md>) | Medium | senior | 45 min | Yelp, Google, Uber, DoorDash |
| [Rate Limiter](<System Design/Rate Limiter.md>) | Medium | senior | 45 min | Stripe, Google, Amazon, Cloudflare |
| [Search Autocomplete](<System Design/Search Autocomplete.md>) | Medium | senior | 45 min | Google, Amazon, Microsoft, LinkedIn |
| [Web Crawler](<System Design/Web Crawler.md>) | Medium | senior | 45 min | Google, Microsoft, Amazon, Apple |
| [Distributed Key-Value Store](<System Design/Distributed Key-Value Store.md>) | Hard | staff | 60 min | Amazon, Google, Meta, Microsoft |
| [Distributed Message Queue](<System Design/Distributed Message Queue.md>) | Hard | staff | 60 min | LinkedIn, Amazon, Confluent, Uber |
| [Payment System](<System Design/Payment System.md>) | Hard | staff | 60 min | Stripe, PayPal, Amazon, Uber |
| [Ride-Sharing Service](<System Design/Ride-Sharing Service.md>) | Hard | staff | 60 min | Uber, Lyft, Grab, DoorDash |
| [Video Streaming Platform](<System Design/Video Streaming Platform.md>) | Hard | staff | 60 min | Netflix, Google, Meta, Amazon |

## Low-Level Design (15)

Object-oriented design: entities, class diagrams, design patterns, concurrency.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Library Management System](<Low-Level Design/Library Management System.md>) | Easy | mid | 45 min | Amazon, Microsoft, Oracle, Adobe |
| [Parking Lot](<Low-Level Design/Parking Lot.md>) | Easy | junior | 45 min | Amazon, Google, Microsoft, Uber |
| [Tic-Tac-Toe](<Low-Level Design/Tic-Tac-Toe.md>) | Easy | junior | 30 min | Amazon, Microsoft, Google, Meta |
| [Vending Machine](<Low-Level Design/Vending Machine.md>) | Easy | junior | 45 min | Amazon, Microsoft, Google, Adobe |
| [ATM](<Low-Level Design/ATM.md>) | Medium | mid | 45 min | Amazon, Microsoft, Goldman Sachs, JPMorgan Chase |
| [Elevator System](<Low-Level Design/Elevator System.md>) | Medium | mid | 45 min | Amazon, Google, Microsoft, Uber |
| [Hotel Reservation System](<Low-Level Design/Hotel Reservation System.md>) | Medium | mid | 45 min | Amazon, Booking.com, Expedia, Airbnb |
| [Logging Framework](<Low-Level Design/Logging Framework.md>) | Medium | mid | 45 min | Amazon, Microsoft, Google, Uber |
| [Movie Ticket Booking](<Low-Level Design/Movie Ticket Booking.md>) | Medium | senior | 60 min | Amazon, Microsoft, Uber, Flipkart |
| [Pub-Sub System](<Low-Level Design/Pub-Sub System.md>) | Medium | senior | 45 min | Amazon, Google, Microsoft, Uber |
| [Splitwise](<Low-Level Design/Splitwise.md>) | Medium | mid | 45 min | Amazon, Flipkart, Uber, Google |
| [Chess Game](<Low-Level Design/Chess Game.md>) | Hard | senior | 60 min | Amazon, Microsoft, Google, Chess.com |
| [In-Memory File System](<Low-Level Design/In-Memory File System.md>) | Hard | senior | 60 min | Google, Amazon, Microsoft, Dropbox |
| [Stock Exchange Order Book](<Low-Level Design/Stock Exchange Order Book.md>) | Hard | staff | 60 min | Jane Street, Citadel, Two Sigma, Goldman Sachs |
| [Task Scheduler](<Low-Level Design/Task Scheduler.md>) | Hard | senior | 60 min | Google, Amazon, Microsoft, Uber |

## Frontend System Design (15)

Client architecture: components, state, rendering performance, accessibility.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Accessible Modal Dialog](<Frontend System Design/Accessible Modal Dialog.md>) | Easy | junior | 45 min | Google, Microsoft, Atlassian, Meta |
| [Image Carousel](<Frontend System Design/Image Carousel.md>) | Easy | junior | 45 min | Google, Meta, Amazon, Airbnb |
| [Poll Widget](<Frontend System Design/Poll Widget.md>) | Easy | mid | 45 min | Meta, Twitter, LinkedIn, Reddit |
| [Autocomplete Component](<Frontend System Design/Autocomplete Component.md>) | Medium | mid | 45 min | Google, Meta, Amazon, Uber |
| [Chat Application UI](<Frontend System Design/Chat Application UI.md>) | Medium | senior | 45 min | Meta, Slack, Discord, Microsoft |
| [Data Table](<Frontend System Design/Data Table.md>) | Medium | mid | 45 min | Google, Microsoft, Atlassian, Stripe |
| [E-commerce Checkout](<Frontend System Design/E-commerce Checkout.md>) | Medium | senior | 45 min | Amazon, Shopify, Stripe, eBay |
| [Infinite Scroll News Feed](<Frontend System Design/Infinite Scroll News Feed.md>) | Medium | senior | 60 min | Meta, Twitter, LinkedIn, Reddit |
| [Kanban Board](<Frontend System Design/Kanban Board.md>) | Medium | senior | 45 min | Atlassian, Asana, Monday.com, Microsoft |
| [Multi-Step Form](<Frontend System Design/Multi-Step Form.md>) | Medium | mid | 45 min | Stripe, Airbnb, Intuit, Shopify |
| [Photo Gallery](<Frontend System Design/Photo Gallery.md>) | Medium | mid | 45 min | Google, Meta, Pinterest, Flickr |
| [Collaborative Document Editor](<Frontend System Design/Collaborative Document Editor.md>) | Hard | staff | 60 min | Google, Microsoft, Notion, Figma |
| [Design System Component Library](<Frontend System Design/Design System Component Library.md>) | Hard | staff | 60 min | Google, Airbnb, Shopify, Atlassian |
| [Spreadsheet](<Frontend System Design/Spreadsheet.md>) | Hard | staff | 60 min | Google, Microsoft, Airtable, Notion |
| [Video Player](<Frontend System Design/Video Player.md>) | Hard | senior | 60 min | Netflix, YouTube, Meta, Twitch |

## AI/ML System Design (15)

ML and LLM systems: problem framing, data, models, evaluation, serving, monitoring.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Email Spam Classifier](<AI-ML System Design/Email Spam Classifier.md>) | Easy | mid | 45 min | Google, Microsoft, Yahoo, Proofpoint |
| [Semantic FAQ Search](<AI-ML System Design/Semantic FAQ Search.md>) | Easy | mid | 45 min | Shopify, Intercom, Zendesk, Atlassian |
| [Sentiment Analysis Service](<AI-ML System Design/Sentiment Analysis Service.md>) | Easy | mid | 45 min | Amazon, Microsoft, Salesforce, Yelp |
| [Content Moderation](<AI-ML System Design/Content Moderation.md>) | Medium | senior | 60 min | Meta, YouTube, TikTok, Reddit |
| [ETA Prediction](<AI-ML System Design/ETA Prediction.md>) | Medium | senior | 45 min | Uber, Lyft, DoorDash, Google |
| [Feature Store](<AI-ML System Design/Feature Store.md>) | Medium | senior | 60 min | Uber, Airbnb, DoorDash, LinkedIn |
| [Fraud Detection](<AI-ML System Design/Fraud Detection.md>) | Medium | senior | 60 min | Stripe, PayPal, Visa, Amazon |
| [LLM Evaluation and Guardrails](<AI-ML System Design/LLM Evaluation and Guardrails.md>) | Medium | senior | 45 min | OpenAI, Anthropic, Google, Microsoft |
| [RAG Document Q&A](<AI-ML System Design/RAG Document Q&A.md>) | Medium | senior | 60 min | OpenAI, Microsoft, Google, Notion |
| [Visual Image Search](<AI-ML System Design/Visual Image Search.md>) | Medium | senior | 45 min | Pinterest, Google, Amazon, Meta |
| [Ads Click Prediction](<AI-ML System Design/Ads Click Prediction.md>) | Hard | staff | 60 min | Meta, Google, Amazon, TikTok |
| [LLM Inference Serving Platform](<AI-ML System Design/LLM Inference Serving Platform.md>) | Hard | staff | 60 min | OpenAI, Anthropic, Google, Meta |
| [Multi-Agent AI Platform](<AI-ML System Design/Multi-Agent AI Platform.md>) | Hard | staff | 60 min | OpenAI, Anthropic, Microsoft, Google |
| [Recommendation System](<AI-ML System Design/Recommendation System.md>) | Hard | staff | 60 min | Netflix, YouTube, TikTok, Meta |
| [Search Ranking](<AI-ML System Design/Search Ranking.md>) | Hard | staff | 60 min | Google, Amazon, Airbnb, LinkedIn |
