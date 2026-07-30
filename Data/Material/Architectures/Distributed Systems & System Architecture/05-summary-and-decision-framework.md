## Summary & Decision Framework

### Table of Contents

- [Quick Reference: When to Use What](#quick-reference-when-to-use-what)
- [The Golden Rules of Distributed Systems](#the-golden-rules-of-distributed-systems)


### Quick Reference: When to Use What

| Decision | Options | Key Factors |
|----------|---------|-------------|
| **Consistency Model** | Strong → Eventual | Data correctness requirements vs. latency/availability needs |
| **Load Balancer Algorithm** | Round Robin / Least Connections / Consistent Hashing | Uniform servers → RR; varied load → LC; cache affinity → CH |
| **Load Balancer Layer** | L4 vs. L7 | Need content-based routing? → L7; Max throughput? → L4 |
| **Caching Pattern** | Cache-Aside / Read-Through / Write-Through / Write-Behind | Read-heavy → Read-through; Write-heavy → Write-behind; General → Cache-aside |
| **Eviction Policy** | LRU / LFU | Recency matters → LRU; Frequency matters → LFU |
| **Messaging** | Queue (RabbitMQ) vs. Stream (Kafka) | Task distribution → Queue; Event sourcing, replay, multiple consumers → Stream |
| **Architecture** | Monolith / Modular Monolith / Microservices | Small team → Monolith; Growing team → Modular Monolith; Large org → Microservices |
| **Event Architecture** | Choreography vs. Orchestration | Simple flows, loose coupling → Choreography; Complex flows, visibility → Orchestration |
| **API Protocol** | REST / GraphQL / gRPC / WebSocket / SSE | See decision tree above |

### The Golden Rules of Distributed Systems

```
1. Start simple, add complexity only when needed
   (Monolith → Modular Monolith → Microservices)

2. Every network call can fail
   (Use circuit breakers, retries, timeouts, and fallbacks)

3. Consistency and availability are a spectrum, not binary choices
   (Pick the right consistency model per use case)

4. Make operations idempotent
   (So retries are safe, and exactly-once semantics achievable)

5. Design for failure, not just success
   (Bulkheads, DLQs, graceful degradation, chaos engineering)

6. Observe everything
   (Distributed tracing, metrics, structured logging, alerting)

7. Data outlives code
   (Schema evolution, backward compatibility, event versioning)
```

---

> **Further Reading & Authoritative Sources:**
> - *Designing Data-Intensive Applications* by Martin Kleppmann
> - *Building Microservices* by Sam Newman
> - *Release It!* by Michael Nygard
> - Google's Spanner paper, Amazon's Dynamo paper, LinkedIn's Kafka paper
> - Microsoft's Cloud Design Patterns documentation
> - The official documentation for each technology mentioned (Kafka, Redis, RabbitMQ, etc.)

---
