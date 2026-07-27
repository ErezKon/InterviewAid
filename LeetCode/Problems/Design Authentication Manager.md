# 1797. Design Authentication Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-authentication-manager](https://leetcode.com/problems/design-authentication-manager)
**Companies:** Atlassian, Confluent, Deliveroo, Docusign, Microsoft, Ncr, Oracle, Twitter

---

## Problem Description

Design an authentication manager with TTL-based tokens: `generate`, `renew` (only if unexpired), `countUnexpiredTokens`.

---

## Approach

```
CLASS AuthenticationManager:
    CONSTRUCTOR(timeToLive):
        self.ttl = timeToLive
        tokens = {}    // tokenId → expiry time

    FUNCTION generate(tokenId, currentTime):
        tokens[tokenId] = currentTime + ttl

    FUNCTION renew(tokenId, currentTime):
        IF tokenId IN tokens AND tokens[tokenId] > currentTime:
            tokens[tokenId] = currentTime + ttl

    FUNCTION countUnexpiredTokens(currentTime):
        RETURN COUNT(t for t in tokens.values() if t > currentTime)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) generate/renew, O(n) count |
| **Space** | O(n) |

---

## Key Takeaway

> **Hash map of tokenId → expiry time. Renew only if `expiry > currentTime`. Count by filtering values. For O(1) count, use an ordered dict with lazy cleanup.**
