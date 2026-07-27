# 1244. Design A Leaderboard

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-leaderboard](https://leetcode.com/problems/design-a-leaderboard)
**Companies:** Amazon, Bloomberg, Citadel, De Shaw, Google, Microsoft, Pinterest, Uber, Wayfair

---

## Problem Description

Design a leaderboard: `addScore(playerId, score)`, `top(K)` returns sum of top K scores, `reset(playerId)`.

---

## Approach

```
CLASS Leaderboard:
    CONSTRUCTOR:
        scores = {}    // playerId → score

    FUNCTION addScore(playerId, score):
        scores[playerId] = scores.get(playerId, 0) + score

    FUNCTION top(K):
        RETURN SUM(sorted(scores.values(), reverse=True)[:K])

    FUNCTION reset(playerId):
        scores[playerId] = 0
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) add/reset, O(n log n) top |
| **Space** | O(n) |

---

## Key Takeaway

> **Hash map for scores, sort for top-K. For frequent top(K) calls, use a SortedList or balanced BST for O(K log n) queries.**
