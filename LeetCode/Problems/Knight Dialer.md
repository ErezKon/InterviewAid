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

A phone pad has digits 0-9. A chess knight starts on any digit and makes `n-1` hops. Count all distinct phone numbers of length `n` that can be dialed. Return modulo 10⁹+7.

**Constraints:**
- `1 <= n <= 5000`

---

## 2. Examples

```
Input: n = 1 → Output: 10 (any single digit)
Input: n = 2 → Output: 20 (each starting digit has 2 or 3 moves, except 5)
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
