# 535. Encode and Decode TinyURL

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/encode-and-decode-tinyurl](https://leetcode.com/problems/encode-and-decode-tinyurl)
**Companies:** Amazon, Apple, Google, Meta, Microsoft, Revolut, Salesforce, Shopify, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Hash Map with Random Key](#approach-hash-map-with-random-key--o1-)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Design a URL shortening service. Implement `encode(longUrl)` → short URL and `decode(shortUrl)` → original long URL.

---

## Key Insight

> Generate a random 6-character key from `[a-zA-Z0-9]` (62⁶ ≈ 56 billion combinations). Store bidirectional mappings. Re-generate on collision. For idempotency, cache `longUrl → shortUrl` so the same URL always gets the same short code.

---

## Approach: Hash Map with Random Key — O(1) ✅

```
CLASS Codec:
    CONSTRUCTOR:
        longToShort = {}
        shortToLong = {}
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    FUNCTION encode(longUrl):
        IF longUrl IN longToShort: RETURN longToShort[longUrl]
        key = generate 6 random chars
        WHILE key IN shortToLong: key = generate 6 random chars
        short = "http://tinyurl.com/" + key
        longToShort[longUrl] = short
        shortToLong[short] = longUrl
        RETURN short

    FUNCTION decode(shortUrl):
        RETURN shortToLong[shortUrl]
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Encode** | O(1) amortized (collision rare with 62⁶ space) |
| **Decode** | O(1) hash lookup |
| **Space** | O(n) for n URLs |

---

## Follow-Up Questions

**Q1: What about using an auto-incrementing counter instead of random?**
> Counter → base62 encoding gives predictable, sequential short URLs. Simpler but URLs are guessable (security concern).

**Q2: How would you scale this for production?**
> Distributed key generation (e.g., ID ranges per server), database-backed storage, caching layer, and 301/302 redirects.

**Q3: What if the same long URL is encoded twice?**
> The `longToShort` cache ensures idempotency — same long URL always returns the same short URL.

---

## Key Takeaway

> **URL shortening = bidirectional hash map + random key generation. In interviews, discuss trade-offs: random vs counter, collision handling, and scaling to distributed systems.**
