# 362. Design Hit Counter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-hit-counter](https://leetcode.com/problems/design-hit-counter)
**Companies:** Affirm, Amazon, Apple, Atlassian, Bloomberg, Careem, Cloudflare, Coupang, Databricks, Dropbox, Google, Meta, Microsoft, Openai, Oracle, Oscar Health, Reddit, Roblox, Sentry, Snapchat, Snowflake, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Design a hit counter that counts hits received in the past 5 minutes (300 seconds).

---

## 2. Approach: Circular Array — O(1) ✅

```
CLASS HitCounter:
    CONSTRUCTOR:
        times = [0] * 300
        hits = [0] * 300

    FUNCTION hit(timestamp):
        idx = timestamp % 300
        IF times[idx] != timestamp:
            times[idx] = timestamp
            hits[idx] = 1
        ELSE:
            hits[idx] += 1

    FUNCTION getHits(timestamp):
        total = 0
        FOR i ← 0 TO 299:
            IF timestamp - times[i] < 300:
                total += hits[i]
        RETURN total
```

### Queue Alternative

```
CLASS HitCounter:
    queue = deque()

    FUNCTION hit(timestamp):
        queue.APPEND(timestamp)

    FUNCTION getHits(timestamp):
        WHILE queue AND queue.FRONT() <= timestamp - 300:
            queue.POPLEFT()
        RETURN queue.SIZE()
```

| Approach | hit() | getHits() | Space |
|----------|-------|-----------|-------|
| **Circular Array** | O(1) | O(300)=O(1) | O(300) |
| Queue | O(1) | O(n) amort | O(n) |

---

## Key Takeaway

> Circular array with modulo indexing provides O(1) operations with fixed space. The timestamp check handles overwrites.
