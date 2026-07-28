# 1997. First Day Where You Have Been in All the Rooms

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms](https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms)
**Companies:** Bytedance

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n) ✅](#3-approach-dp--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
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

## 4. Examples

**Example 1:**
```
Input:  nextVisit = [0,0,2]
Output: 6
Explanation: The sequence of visited rooms is
Day 0: room 0 → odd → nextVisit[0]=0
Day 1: room 0 → even → room 1
Day 2: room 1 → odd → nextVisit[1]=0
Day 3: room 0 → even → room 1
Day 4: room 1 → even → room 2
Day 5: room 2 → odd → nextVisit[2]=2
Day 6: room 2 → even → all rooms visited.
```

**Example 2:**
```
Input:  nextVisit = [0,1,2,2]
Output: 10
```

---

## 5. Walkthrough

We illustrate Example 1 step‑by‑step.

| Day | Current Room | Visit Count (odd/even) | Next Room |
|-----|--------------|-----------------------|-----------|
| 0   | 0            | odd                   | 0 (nextVisit[0]) |
| 1   | 0            | even                  | 1 |
| 2   | 1            | odd                   | 0 (nextVisit[1]) |
| 3   | 0            | even                  | 1 |
| 4   | 1            | even                  | 2 |
| 5   | 2            | odd                   | 2 (nextVisit[2]) |
| 6   | 2            | even                  | all rooms visited |

The DP recurrence captures exactly these transitions, yielding `dp[2] = 6`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Key Takeaway

> The recurrence `dp[i] = 2*dp[i-1] - dp[nextVisit[i-1]] + 2` captures the cost of revisiting rooms to achieve an even visit count. Classic DP with modular arithmetic.
