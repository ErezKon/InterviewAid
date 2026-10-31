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

There are `n` rooms you need to visit, labeled from `0` to `n - 1`. Each day is labeled, starting from `0`. You will go in and visit one room a day.

Initially on day `0`, you visit room `0`. The **order** you visit the rooms for the coming days is determined by the following **rules** and a given **0-indexed** array `nextVisit` of length `n`:

- Assuming that on a day, you visit room `i`,
- if you have been in room `i` an **odd** number of times (**including** the current visit), on the **next** day you will visit a room with a **lower or equal room number** specified by `nextVisit[i]` where `0 <= nextVisit[i] <= i`;
- if you have been in room `i` an **even** number of times (**including** the current visit), on the **next** day you will visit room `(i + 1) mod n`.

Return *the label of the **first** day where you have been in **all** the rooms*. It can be shown that such a day exists. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `n == nextVisit.length`
- `2 <= n <= 10^5`
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
Input: nextVisit = [0,0]
Output: 2
Explanation: - On day 0, you visit room 0. The total times you have been in room 0 is 1, which is odd.
  On the next day you will visit room nextVisit[0] = 0
- On day 1, you visit room 0, The total times you have been in room 0 is 2, which is even.
  On the next day you will visit room (0 + 1) mod 2 = 1
- On day 2, you visit room 1. This is the first day where you have been in all the rooms.
```

**Example 2:**
```
Input: nextVisit = [0,0,2]
Output: 6
Explanation: Your room visiting order for each day is: [0,0,1,0,0,1,2,...].
Day 6 is the first day where you have been in all the rooms.
```

**Example 3:**
```
Input: nextVisit = [0,1,2,0]
Output: 6
Explanation: Your room visiting order for each day is: [0,0,1,1,2,2,3,...].
Day 6 is the first day where you have been in all the rooms.
```

---

## 5. Walkthrough

We illustrate Example 1 step-by-step.

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
