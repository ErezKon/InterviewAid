# 362. Design Hit Counter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-hit-counter](https://leetcode.com/problems/design-hit-counter)
**Companies:** Affirm, Amazon, Apple, Atlassian, Bloomberg, Careem, Cloudflare, Coupang, Databricks, Dropbox, Google, Meta, Microsoft, Openai, Oracle, Oscar Health, Reddit, Roblox, Sentry, Snapchat, Snowflake, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Design a hit counter that counts hits received in the past 5 minutes (300 seconds).

---

## Examples

**Example 1:**
```
HitCounter counter = new HitCounter();
counter.hit(1);      // hit at timestamp 1.
counter.hit(2);      // hit at timestamp 2.
counter.hit(300);    // hit at timestamp 300.
counter.getHits(300); // returns 3 (hits at 1,2,300 are within last 300 seconds)
counter.getHits(301); // returns 2 (hit at 1 is now older than 300 seconds)
```

**Explanation:** The counter records each hit timestamp and returns the number of hits in the last 300 seconds.

---

## Walkthrough

| Step | Operation | Internal State (times, hits) |
|------|-----------|------------------------------|
| 1 | `hit(1)` | `times[1] = 1`, `hits[1] = 1`
| 2 | `hit(2)` | `times[2] = 2`, `hits[2] = 1`
| 3 | `hit(300)` | `times[0] = 300`, `hits[0] = 1` (index 0 = 300 % 300)
| 4 | `getHits(300)` | Iterate 0‑299, sum hits where `300 - times[i] < 300` → total = 3 |
| 5 | `getHits(301)` | `times[1] = 1` is now older than 300 seconds, excluded → total = 2 |

The walkthrough shows how the circular array overwrites old timestamps and how the sum is computed.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time (hit)** | O(1) |
| **Time (getHits)** | O(300) = O(1) |
| **Space** | O(300) = O(1) |

---

## Key Takeaway

> Circular array with modulo indexing provides O(1) operations with fixed space. The timestamp check handles overwrites.
