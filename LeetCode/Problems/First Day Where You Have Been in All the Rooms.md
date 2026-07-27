# 1997. First Day Where You Have Been in All the Rooms

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms](https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms)
**Companies:** Bytedance

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n) ✅](#3-approach-dp--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You visit rooms 0 to n-1. On odd visits to room `i`, go to `nextVisit[i]`; on even visits, go to `(i+1) % n`. Find the first day you've visited all rooms.

**Constraints:**
- `2 <= n <= 10⁵`
- `0 <= nextVisit[i] <= i`

---

## 2. Key Insight

> Let `dp[i]` = first day you visit room `i`. To move from room `i` to `i+1`, you need an even number of visits to room `i`. The first visit to `i` sends you back to `nextVisit[i]`, requiring you to revisit all rooms from `nextVisit[i]` to `i` again.

---

## 3. Approach: DP — O(n) ✅

```
FUNCTION firstDayBeenInAllRooms(nextVisit):
    n ← LENGTH(nextVisit)
    dp ← [0] * n    // dp[i] = first day we arrive at room i
    MOD ← 10^9 + 7

    FOR i ← 1 TO n - 1 DO
        // Days to get back from nextVisit[i] to i, plus 2 transition days
        dp[i] = (2 * dp[i-1] - dp[nextVisit[i-1]] + 2) % MOD

    RETURN dp[n - 1]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> The recurrence `dp[i] = 2*dp[i-1] - dp[nextVisit[i-1]] + 2` captures the cost of revisiting rooms to achieve an even visit count. Classic DP with modular arithmetic.
