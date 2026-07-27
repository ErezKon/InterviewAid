# 1583. Count Unhappy Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unhappy-friends](https://leetcode.com/problems/count-unhappy-friends)
**Companies:** Bloomberg, Google

---

## Problem Description

Given `n` friends with preference lists and a pairing, friend `x` is **unhappy** if there exists `u` such that `x` prefers `u` over their partner AND `u` prefers `x` over their partner. Count unhappy friends.

---

## Key Insight

Precompute `rank[x][y]` = position of `y` in `x`'s preference list (lower = more preferred). For each person `x` paired with `p`, check all people `u` whom `x` prefers over `p`. If `u` also prefers `x` over `u`'s partner, `x` is unhappy.

---

## Approach

```
FUNCTION unhappyFriends(n, preferences, pairs):
    rank = [[0]*n for _ in range(n)]
    FOR x ← 0 TO n-1:
        FOR i, y IN enumerate(preferences[x]):
            rank[x][y] = i

    partner = [0] * n
    FOR [a, b] IN pairs: partner[a] = b; partner[b] = a

    unhappy = 0
    FOR x ← 0 TO n-1:
        p = partner[x]
        FOR u IN preferences[x]:
            IF u == p: BREAK  // no one preferred more
            IF rank[u][x] < rank[u][partner[u]]:
                unhappy += 1; BREAK

    RETURN unhappy
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) |
| **Space** | O(n²) for rank matrix |

---

## Key Takeaway

> **Precompute preference rank matrix for O(1) comparison. For each person, check if any preferred candidate also reciprocates the preference over their own partner.**
