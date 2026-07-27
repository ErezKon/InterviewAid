# 2928. Distribute Candies Among Children I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-candies-among-children-i](https://leetcode.com/problems/distribute-candies-among-children-i)
**Companies:** Amazon, Rubrik

---

## Problem Description

Distribute `n` candies among 3 children so each gets at most `limit`. Return the number of ways. Small constraints allow brute force.

**Constraints:** `1 <= n <= 50`, `1 <= limit <= 50`

---

## Approach: Brute Force ✅

```
FUNCTION distributeCandies(n, limit):
    count ← 0
    FOR a ← 0 TO MIN(n, limit) DO
        FOR b ← 0 TO MIN(n - a, limit) DO
            c ← n - a - b
            IF 0 <= c <= limit THEN count += 1
    RETURN count
END FUNCTION
```

Also solvable with the O(1) inclusion-exclusion formula from LC 2929.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(limit²) | Two nested loops |
| **Space** | O(1) | Counter only |

---

## Key Takeaway

> **Small constraints → brute-force enumeration of two variables, derive the third. For larger inputs, use the stars-and-bars + inclusion-exclusion formula.**
