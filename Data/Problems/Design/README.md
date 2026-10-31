# Design Interview Problems

**130 problems** in 4 categories.

Design problems that come up in interviews, one markdown file per problem, grouped by category. Each file has a fixed header (`**Category:**`, `**Difficulty:**`, `**Seniority:**`, `**Companies:**`, `**Tags:**`, `**Time:**`) and the same sections: Problem Statement, Clarifying Questions, Requirements, category-specific solution sections, Trade-offs, Follow-up Questions, Common Mistakes, Key Takeaways.

The app (`app/`) reads these files directly. They appear on the **Design** page and the chat agents can use them (search, coaching, mock design interviews). This README and files starting with `_` are skipped.

## System Design (36)

Distributed backend systems: scale, storage, consistency, caching, queues.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [API Gateway](System Design/API Gateway.md) | Medium | senior | 45 min | Amazon, Netflix, Google, Microsoft, Uber, Stripe, Kong, Cloudflare |
| [Ad Click Aggregation](System Design/Ad Click Aggregation.md) | Hard | Senior | 90-120 min | Google, Meta |
| [Chat System](System Design/Chat System.md) | Medium | senior | 45 min | Meta, WhatsApp, Slack, Discord, Microsoft, Amazon, Telegram |
| [Counter Service](System Design/Counter Service.md) | Easy | Junior | 30-45 min | Reddit, Twitter |
| [Distributed Job Scheduler](System Design/Distributed Job Scheduler.md) | Medium | mid-level | 60-90 min | Airbnb, Uber, Amazon, Netflix, Google, Stripe |
| [Distributed Key-Value Store](System Design/Distributed Key-Value Store.md) | Hard | staff | 60 min | Amazon, Google, Meta, Microsoft, Apple, Databricks, Stripe |
| [Distributed Lock Service](System Design/Distributed Lock Service.md) | Hard | Senior | 90-120 min | Google, ZooKeeper |
| [Distributed Message Queue](System Design/Distributed Message Queue.md) | Hard | staff | 60 min | LinkedIn, Amazon, Confluent, Uber, Netflix, Microsoft, Google |
| [Distributed Search Engine](System Design/Distributed Search Engine.md) | Hard | senior | 90-120 min | Elasticsearch, Algolia |
| [Distributed Unique ID Generator](System Design/Distributed Unique ID Generator.md) | Easy | mid | 45 min | Twitter, Instagram, Discord, Amazon, Uber, Stripe |
| [Email Service](System Design/Email Service.md) | Medium | senior | 45 min | Google, Microsoft, Yahoo, Proton, Amazon, Zoho |
| [Flash Sale Seat Reservation](System Design/Flash Sale Seat Reservation.md) | Medium | mid-level | 60-90 min | Ticketmaster, StubHub, Eventbrite, Live Nation |
| [Food Delivery Platform](System Design/Food Delivery Platform.md) | Medium | mid-level | 60-90 min | DoorDash, Uber Eats, Grubhub, Deliveroo, Zomato |
| [Global CDN](System Design/Global CDN.md) | Hard | senior | 90-120 min | Cloudflare, Akamai, Fastly, AWS CloudFront, Google Cloud CDN |
| [Google Docs Backend](System Design/Google Docs Backend.md) | Medium | senior | 90-120 min | Google, Microsoft, Dropbox, Notion, Atlassian |
| [Google Drive File Sync](System Design/Google Drive File Sync.md) | Hard | senior | 90-120 min | Google, Dropbox |
| [Hotel Booking System](System Design/Hotel Booking System.md) | Medium | mid-level | 60-90 min | Booking.com, Airbnb, Expedia, Hotels.com, Marriott |
| [Instagram Backend](System Design/Instagram Backend.md) | Medium | senior | 90-120 min | Instagram, Meta |
| [Key-Value Cache](System Design/Key-Value Cache.md) | Easy | mid | 45 min | Amazon, Google, Meta, Microsoft, Netflix, Uber |
| [Leaderboard](System Design/Leaderboard.md) | Easy | Junior | 30-45 min | LeetCode, HackerRank |
| [Metrics and Monitoring System](System Design/Metrics and Monitoring System.md) | Medium | Mid-level | 60-90 min | Datadog, New Relic |
| [News Feed](System Design/News Feed.md) | Medium | senior | 45 min | Meta, Twitter, LinkedIn, Instagram, Pinterest, Snap, Reddit |
| [Notification System](System Design/Notification System.md) | Medium | senior | 45 min | Amazon, Meta, Uber, LinkedIn, Airbnb, DoorDash, Slack |
| [Online Multiplayer Game Backend](System Design/Online Multiplayer Game Backend.md) | Hard | senior | 90-120 min | Epic Games, Unity, Roblox, Valve, Riot Games, Activision |
| [Pastebin](System Design/Pastebin.md) | Easy | mid | 45 min | Amazon, Microsoft, Google, Dropbox, GitHub, Atlassian |
| [Payment System](System Design/Payment System.md) | Hard | staff | 60 min | Stripe, PayPal, Amazon, Uber, Square, Shopify, Coinbase |
| [Photo Sharing Platform](System Design/Photo Sharing Platform.md) | Medium | senior | 45 min | Meta, Instagram, Pinterest, Snap, Google, Amazon, Flickr |
| [Proximity Service](System Design/Proximity Service.md) | Medium | senior | 45 min | Yelp, Google, Uber, DoorDash, Meta, Airbnb |
| [Rate Limiter](System Design/Rate Limiter.md) | Medium | senior | 45 min | Stripe, Google, Amazon, Cloudflare, Uber, Microsoft, LinkedIn |
| [Ride-Sharing Service](System Design/Ride-Sharing Service.md) | Hard | staff | 60 min | Uber, Lyft, Grab, DoorDash, Amazon, Google, Bolt |
| [Search Autocomplete](System Design/Search Autocomplete.md) | Medium | senior | 45 min | Google, Amazon, Microsoft, LinkedIn, Uber, Airbnb |
| [Stock Exchange Platform](System Design/Stock Exchange Platform.md) | Hard | staff | 60 min | Coinbase, Robinhood, Jane Street, Citadel, Goldman Sachs, Nasdaq, Bloomberg |
| [Typeahead for Social Search](System Design/Typeahead for Social Search.md) | Medium | mid-level | 60-90 min | LinkedIn, Twitter, Facebook, Google, Instagram |
| [URL Shortener](System Design/URL Shortener.md) | Easy | mid | 45 min | Google, Amazon, Microsoft, Bitly, Meta, Uber |
| [Video Streaming Platform](System Design/Video Streaming Platform.md) | Hard | staff | 60 min | Netflix, Google, Meta, Amazon, TikTok, Twitch, Disney |
| [Web Crawler](System Design/Web Crawler.md) | Medium | senior | 45 min | Google, Microsoft, Amazon, Apple, OpenAI, Bloomberg |

## Low-Level Design (31)

Object-oriented design: entities, class diagrams, design patterns, concurrency.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [ATM](Low-Level Design/ATM.md) | Medium | mid | 45 min | Amazon, Microsoft, Goldman Sachs, JPMorgan Chase, Visa, PayPal |
| [Cab Booking System](Low-Level Design/Cab Booking System.md) | Medium | mid | 45-60 min | Uber, Lyft |
| [Car Rental System](Low-Level Design/Car Rental System.md) | Medium | mid | 45 min | Amazon, Microsoft, Uber, Booking.com, Expedia, Flipkart |
| [Chess Game](Low-Level Design/Chess Game.md) | Hard | senior | 60 min | Amazon, Microsoft, Google, Chess.com, Bloomberg, Adobe |
| [Coffee Machine](Low-Level Design/Coffee Machine.md) | Easy | junior | 30-45 min | Common interview question |
| [Concurrent Job Queue](Low-Level Design/Concurrent Job Queue.md) | Hard | Senior | 60-90 min | Common interview question at Amazon, Google, Meta, Netflix, Uber, Stripe |
| [Elevator Group Control](Low-Level Design/Elevator Group Control.md) | Hard | Senior | 60-90 min | Otis, Schindler, KONE, ThyssenKrupp, Mitsubishi Electric |
| [Elevator System](Low-Level Design/Elevator System.md) | Medium | mid | 45 min | Amazon, Google, Microsoft, Uber, Bloomberg, Salesforce |
| [Hotel Reservation System](Low-Level Design/Hotel Reservation System.md) | Medium | mid | 45 min | Amazon, Booking.com, Expedia, Airbnb, Microsoft, Oracle |
| [In-Memory File System](Low-Level Design/In-Memory File System.md) | Hard | senior | 60 min | Google, Amazon, Microsoft, Dropbox, Apple, Databricks |
| [In-Process Rate Limiter](Low-Level Design/In-Process Rate Limiter.md) | Easy | junior | 30-45 min | Common interview question |
| [Inventory Management System](Low-Level Design/Inventory Management System.md) | Medium | mid | 45 min | Amazon, Walmart, Flipkart, Shopify, Target, Ocado |
| [LRU Cache OOP](Low-Level Design/LRU Cache OOP.md) | Easy | junior | 30-45 min | LeetCode, HackerRank |
| [Library Management System](Low-Level Design/Library Management System.md) | Easy | mid | 45 min | Amazon, Microsoft, Oracle, Adobe, Salesforce, Atlassian |
| [Logging Framework](Low-Level Design/Logging Framework.md) | Medium | mid | 45 min | Amazon, Microsoft, Google, Uber, Salesforce, Atlassian |
| [Meeting Room Scheduler](Low-Level Design/Meeting Room Scheduler.md) | Medium | mid | 45-60 min | Common interview question |
| [Movie Ticket Booking](Low-Level Design/Movie Ticket Booking.md) | Medium | senior | 60 min | Amazon, Microsoft, Uber, Flipkart, Atlassian, Booking.com, Walmart |
| [Notification Service](Low-Level Design/Notification Service.md) | Medium | mid | 45-60 min | Twilio, SendGrid |
| [Online Shopping Cart](Low-Level Design/Online Shopping Cart.md) | Medium | mid | 45-60 min | Amazon, Shopify |
| [Parking Lot](Low-Level Design/Parking Lot.md) | Easy | junior | 45 min | Amazon, Google, Microsoft, Uber, Goldman Sachs, Adobe |
| [Pluggable Cache Framework](Low-Level Design/Pluggable Cache Framework.md) | Hard | senior | 60 min | Google, Amazon, Microsoft, Netflix, Uber, Salesforce |
| [Pub-Sub System](Low-Level Design/Pub-Sub System.md) | Medium | senior | 45 min | Amazon, Google, Microsoft, Uber, LinkedIn, Confluent |
| [Restaurant Management](Low-Level Design/Restaurant Management.md) | Medium | mid | 45-60 min | OpenTable, Yelp |
| [Snake and Ladder](Low-Level Design/Snake and Ladder.md) | Easy | junior | 30 min | Amazon, Microsoft, Flipkart, Swiggy, Uber, Zoho |
| [Social Network](Low-Level Design/Social Network.md) | Hard | Senior | 60-90 min | LinkedIn, Facebook (Meta), Twitter (X), Instagram, Snapchat |
| [Splitwise](Low-Level Design/Splitwise.md) | Medium | mid | 45 min | Amazon, Flipkart, Uber, Google, Microsoft, Atlassian |
| [Stock Exchange Order Book](Low-Level Design/Stock Exchange Order Book.md) | Hard | staff | 60 min | Jane Street, Citadel, Two Sigma, Goldman Sachs, Bloomberg, Coinbase, Robinhood |
| [Task Scheduler](Low-Level Design/Task Scheduler.md) | Hard | senior | 60 min | Google, Amazon, Microsoft, Uber, Netflix, Airbnb |
| [Text Editor with Undo Redo](Low-Level Design/Text Editor with Undo Redo.md) | Medium | mid | 45-60 min | Common interview question |
| [Tic-Tac-Toe](Low-Level Design/Tic-Tac-Toe.md) | Easy | junior | 30 min | Amazon, Microsoft, Google, Meta, Apple, Zoho |
| [Vending Machine](Low-Level Design/Vending Machine.md) | Easy | junior | 45 min | Amazon, Microsoft, Google, Adobe, Walmart, Flipkart |

## Frontend System Design (31)

Client architecture: components, state, rendering performance, accessibility.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Accessible Modal Dialog](Frontend System Design/Accessible Modal Dialog.md) | Easy | junior | 45 min | Google, Microsoft, Atlassian, Meta, Shopify, Salesforce |
| [Autocomplete Component](Frontend System Design/Autocomplete Component.md) | Medium | mid | 45 min | Google, Meta, Amazon, Uber, Airbnb, LinkedIn, Microsoft |
| [Calendar](Frontend System Design/Calendar.md) | Medium | Mid-level | 45-60 min | Google, Microsoft, Apple, Outlook, Calendly |
| [Canvas Design Editor](Frontend System Design/Canvas Design Editor.md) | Hard | staff | 60 min | Figma, Canva, Adobe, Miro, Microsoft, Google |
| [Chat Application UI](Frontend System Design/Chat Application UI.md) | Medium | senior | 45 min | Meta, Slack, Discord, Microsoft, WhatsApp, Telegram |
| [Code Editor](Frontend System Design/Code Editor.md) | Hard | senior | 60-90 min | VS Code, Monaco Editor, CodeMirror, Atom, Sublime Text, JetBrains |
| [Collaborative Document Editor](Frontend System Design/Collaborative Document Editor.md) | Hard | staff | 60 min | Google, Microsoft, Notion, Figma, Dropbox, Atlassian, Coda |
| [Comments Thread](Frontend System Design/Comments Thread.md) | Medium | Mid-level | 45-60 min | Reddit, Disqus, Stack Overflow, GitHub, YouTube |
| [Dashboard with Widgets](Frontend System Design/Dashboard with Widgets.md) | Medium | Mid-level | 45-60 min | Datadog, New Relic, Grafana, Tableau, Salesforce |
| [Data Table](Frontend System Design/Data Table.md) | Medium | mid | 45 min | Google, Microsoft, Atlassian, Stripe, Datadog, Airtable, Salesforce |
| [Design System Component Library](Frontend System Design/Design System Component Library.md) | Hard | staff | 60 min | Google, Airbnb, Shopify, Atlassian, Salesforce, Uber, Microsoft |
| [E-commerce Checkout](Frontend System Design/E-commerce Checkout.md) | Medium | senior | 45 min | Amazon, Shopify, Stripe, eBay, Walmart, Airbnb |
| [Email Client](Frontend System Design/Email Client.md) | Medium | senior | 45 min | Google, Microsoft, Yahoo, Apple, Proton, Superhuman |
| [File Upload Widget](Frontend System Design/File Upload Widget.md) | Easy | junior | 30-45 min | Common UI component |
| [Image Carousel](Frontend System Design/Image Carousel.md) | Easy | junior | 45 min | Google, Meta, Amazon, Airbnb, Uber, Shopify |
| [Infinite Scroll News Feed](Frontend System Design/Infinite Scroll News Feed.md) | Medium | senior | 60 min | Meta, Twitter, LinkedIn, Reddit, Pinterest, TikTok, Instagram |
| [Kanban Board](Frontend System Design/Kanban Board.md) | Medium | senior | 45 min | Atlassian, Asana, Monday.com, Microsoft, Linear, Notion |
| [Map with Clustering](Frontend System Design/Map with Clustering.md) | Medium | mid-level | 45-60 min | Google Maps, Mapbox, Uber, Lyft, Airbnb, Foursquare |
| [Multi-Step Form](Frontend System Design/Multi-Step Form.md) | Medium | mid | 45 min | Stripe, Airbnb, Intuit, Shopify, Google, Amazon, Robinhood |
| [Offline-first PWA](Frontend System Design/Offline-first PWA.md) | Hard | senior | 60-90 min | Common PWA pattern, Twitter Lite, Instagram Lite, Airbnb, Uber, Progressive Web Apps |
| [Photo Gallery](Frontend System Design/Photo Gallery.md) | Medium | mid | 45 min | Google, Meta, Pinterest, Flickr, Shutterstock, Airbnb |
| [Poll Widget](Frontend System Design/Poll Widget.md) | Easy | mid | 45 min | Meta, Twitter, LinkedIn, Reddit, Slack, Discord |
| [Real-time Trading Dashboard](Frontend System Design/Real-time Trading Dashboard.md) | Hard | senior | 60-90 min | Robinhood, Bloomberg, Interactive Brokers, Webull, Fidelity, Charles Schwab |
| [Rich Text Editor](Frontend System Design/Rich Text Editor.md) | Medium | mid-level | 45-60 min | Notion, Medium, Quip, Google Docs, WordPress, CKSource |
| [Search Results Page](Frontend System Design/Search Results Page.md) | Medium | mid | 45 min | Amazon, eBay, Walmart, Etsy, Shopify, Airbnb, Zalando |
| [Spreadsheet](Frontend System Design/Spreadsheet.md) | Hard | staff | 60 min | Google, Microsoft, Airtable, Notion, Smartsheet, Figma |
| [Star Rating](Frontend System Design/Star Rating.md) | Easy | junior | 30 min | Amazon, Airbnb, Uber, Yelp, Shopify, Booking.com |
| [Tabs and Accordion](Frontend System Design/Tabs and Accordion.md) | Easy | junior | 30-45 min | Common UI component |
| [Toast Notification System](Frontend System Design/Toast Notification System.md) | Easy | junior | 30-45 min | Common UI component |
| [Video Conferencing UI](Frontend System Design/Video Conferencing UI.md) | Hard | senior | 60-90 min | Zoom, Google Meet, Microsoft Teams, Webex, Discord, Slack Huddles |
| [Video Player](Frontend System Design/Video Player.md) | Hard | senior | 60 min | Netflix, YouTube, Meta, Twitch, Disney+, Amazon, Vimeo |

## AI-ML System Design (32)

ML and LLM systems: problem framing, data, models, evaluation, serving, monitoring.

| Problem | Difficulty | Seniority | Time | Asked at |
|---|---|---|---|---|
| [Ads Click Prediction](AI-ML System Design/Ads Click Prediction.md) | Hard | staff | 60 min | Meta, Google, Amazon, TikTok, Snap, Pinterest, Criteo |
| [Anomaly Detection for Metrics](AI-ML System Design/Anomaly Detection for Metrics.md) | Medium | mid-level | 60-90 min | Datadog, Splunk |
| [Autonomous Coding Agent](AI-ML System Design/Autonomous Coding Agent.md) | Hard | Senior | 90-120 min | GitHub, Anthropic |
| [Churn Prediction](AI-ML System Design/Churn Prediction.md) | Medium | Mid-level | 60-90 min | Common ML use case (Telecom, SaaS, Subscription Services, E-commerce, Gaming) |
| [Code Completion Assistant](AI-ML System Design/Code Completion Assistant.md) | Medium | senior | 45 min | GitHub, Microsoft, Google, JetBrains, Sourcegraph, Replit, Amazon |
| [Content Moderation](AI-ML System Design/Content Moderation.md) | Medium | senior | 60 min | Meta, YouTube, TikTok, Reddit, Discord, X, Roblox |
| [Customer Support Chatbot](AI-ML System Design/Customer Support Chatbot.md) | Medium | Mid-level | 60-90 min | Intercom, Zendesk, Salesforce, Drift, Ada, LivePerson |
| [Document OCR and Extraction](AI-ML System Design/Document OCR and Extraction.md) | Medium | mid-level | 60-90 min | Google, Adobe |
| [Duplicate Question Detection](AI-ML System Design/Duplicate Question Detection.md) | Easy | mid | 45 min | Quora, Stack Overflow, Reddit, Amazon, Meta, LinkedIn |
| [ETA Prediction](AI-ML System Design/ETA Prediction.md) | Medium | senior | 45 min | Uber, Lyft, DoorDash, Google, Grab, Instacart |
| [Email Spam Classifier](AI-ML System Design/Email Spam Classifier.md) | Easy | mid | 45 min | Google, Microsoft, Yahoo, Proofpoint, Mailchimp, Cloudflare |
| [Feature Store](AI-ML System Design/Feature Store.md) | Medium | senior | 60 min | Uber, Airbnb, DoorDash, LinkedIn, Spotify, Databricks, Netflix |
| [Fraud Detection](AI-ML System Design/Fraud Detection.md) | Medium | senior | 60 min | Stripe, PayPal, Visa, Amazon, Square, Revolut, Uber |
| [LLM Evaluation and Guardrails](AI-ML System Design/LLM Evaluation and Guardrails.md) | Medium | senior | 45 min | OpenAI, Anthropic, Google, Microsoft, Meta, Salesforce |
| [LLM Fine-Tuning Platform](AI-ML System Design/LLM Fine-Tuning Platform.md) | Hard | staff | 60 min | OpenAI, Anthropic, Google, Databricks, Together AI, Anyscale, Amazon |
| [LLM Inference Serving Platform](AI-ML System Design/LLM Inference Serving Platform.md) | Hard | staff | 60 min | OpenAI, Anthropic, Google, Meta, Microsoft, NVIDIA, Databricks, Together AI |
| [Multi-Agent AI Platform](AI-ML System Design/Multi-Agent AI Platform.md) | Hard | staff | 60 min | OpenAI, Anthropic, Microsoft, Google, Salesforce, ServiceNow, Cognition |
| [Multimodal Search](AI-ML System Design/Multimodal Search.md) | Hard | Senior | 90-120 min | Google, Pinterest |
| [People You May Know](AI-ML System Design/People You May Know.md) | Hard | Senior | 90-120 min | LinkedIn, Facebook, Twitter/X, Instagram |
| [Personalized Push Notifications](AI-ML System Design/Personalized Push Notifications.md) | Medium | Mid-level | 60-90 min | Braze, Airship, OneSignal, Leanplum, Iterable |
| [Product Categorization](AI-ML System Design/Product Categorization.md) | Easy | mid | 45 min | Amazon, Walmart, eBay, Shopify, Etsy, Instacart, Flipkart |
| [RAG Document Q&A](AI-ML System Design/RAG Document Q&A.md) | Medium | senior | 60 min | OpenAI, Microsoft, Google, Notion, Glean, Databricks, Salesforce |
| [Real-time Bidding](AI-ML System Design/Real-time Bidding.md) | Hard | Senior | 90-120 min | Google, Meta |
| [Recommendation System](AI-ML System Design/Recommendation System.md) | Hard | staff | 60 min | Netflix, YouTube, TikTok, Meta, Amazon, Spotify, Pinterest |
| [Search Ranking](AI-ML System Design/Search Ranking.md) | Hard | staff | 60 min | Google, Amazon, Airbnb, LinkedIn, Microsoft, eBay, Etsy |
| [Semantic FAQ Search](AI-ML System Design/Semantic FAQ Search.md) | Easy | mid | 45 min | Shopify, Intercom, Zendesk, Atlassian, Airbnb, Uber |
| [Sentiment Analysis Service](AI-ML System Design/Sentiment Analysis Service.md) | Easy | mid | 45 min | Amazon, Microsoft, Salesforce, Yelp, Zendesk, Sprinklr |
| [Speech to Text Pipeline](AI-ML System Design/Speech to Text Pipeline.md) | Medium | mid-level | 60-90 min | Google, Amazon |
| [Text Summarization Service](AI-ML System Design/Text Summarization Service.md) | Easy | Junior | 45-60 min | Common ML service (Google, Microsoft, Meta, OpenAI, Anthropic) |
| [Text-to-SQL Assistant](AI-ML System Design/Text-to-SQL Assistant.md) | Medium | senior | 45 min | Databricks, Snowflake, Microsoft, Google, Uber, Airbnb, Salesforce |
| [Visual Image Search](AI-ML System Design/Visual Image Search.md) | Medium | senior | 45 min | Pinterest, Google, Amazon, Meta, eBay, Shopify |
| [YouTube Video Recommendations](AI-ML System Design/YouTube Video Recommendations.md) | Hard | Senior | 90-120 min | YouTube, Netflix, TikTok, Meta, Amazon Prime Video |

