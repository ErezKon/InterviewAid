# 935. Knight Dialer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/knight-dialer](https://leetcode.com/problems/knight-dialer)
**Companies:** Amazon, Bloomberg, Box, Bridgewater Associates, Google, Meta, Whatnot

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n) ✅](#4-approach-dp--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

The chess knight has a **unique movement**, it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an **L**). The possible movements of chess knight are shown in this diagram:

A chess knight can move as indicated in the chess diagram below:
![img](https://assets.leetcode.com/uploads/2020/08/18/chess.jpg)
We have a chess knight and a phone pad as shown below, the knight **can only stand on a numeric cell** (i.e. blue cell).
![img](https://assets.leetcode.com/uploads/2020/08/18/phone.jpg)
Given an integer `n`, return how many distinct phone numbers of length `n` we can dial.

You are allowed to place the knight **on any numeric cell** initially and then you should perform `n - 1` jumps to dial a number of length `n`. All jumps should be **valid** knight jumps.

As the answer may be very large, **return the answer modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 5000`

---

## 2. Examples

**Example 1:**
```
Input: n = 1
Output: 10
Explanation: We need to dial a number of length 1, so placing the knight over any numeric cell of the 10 cells is sufficient.
```

**Example 2:**
```
Input: n = 2
Output: 20
Explanation: All the valid number we can dial are [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]
```

**Example 3:**
```
Input: n = 3131
Output: 136006598
Explanation: Please take care of the mod.
```

---

## 3. Key Insight

The knight moves form a fixed graph on 10 digits. `dp[digit]` = number of ways to reach that digit after `step` hops. Each step, update based on predecessor moves. Note: digit 5 has **no** knight moves to/from it.

---

## 4. Approach: DP — O(n) ✅

```
FUNCTION knightDialer(n):
    MOD = 10^9 + 7
    // Knight moves from each digit
    moves = {0:[4,6], 1:[6,8], 2:[7,9], 3:[4,8], 4:[0,3,9],
             5:[], 6:[0,1,7], 7:[2,6], 8:[1,3], 9:[2,4]}

    dp = [1] * 10
    FOR step ← 1 TO n - 1:
        newDp = [0] * 10
        FOR digit ← 0 TO 9:
            FOR prev IN moves[digit]:
                newDp[digit] = (newDp[digit] + dp[prev]) % MOD
        dp = newDp

    RETURN SUM(dp) % MOD
```

---

## 5. Walkthrough

```
n = 2, starting dp = [1,1,1,1,1,1,1,1,1,1]
```

| Digit | Predecessors | newDp |
|-------|-------------|-------|
| 0 | 4, 6 | 2 |
| 1 | 6, 8 | 2 |
| 2 | 7, 9 | 2 |
| 3 | 4, 8 | 2 |
| 4 | 0, 3, 9 | 3 |
| 5 | — | 0 |
| 6 | 0, 1, 7 | 3 |
| 7 | 2, 6 | 2 |
| 8 | 1, 3 | 2 |
| 9 | 2, 4 | 2 |

Sum = 20 ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | 10 digits × constant moves per step |
| Space | O(1) | Fixed 10-element array |

---

## 7. Follow-Up Questions

### 7.1 Can this be optimized for very large n?

Yes — **matrix exponentiation**. The 10×10 transition matrix can be exponentiated in O(log n), giving O(10³ log n) total.

---

## 8. Key Takeaway

> Fixed transition graph on 10 states → simple DP with O(1) space per step. For large n, matrix exponentiation reduces to O(log n). Digit 5 is isolated (no knight moves).
