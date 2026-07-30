# 2400. Number of Ways to Reach a Position After Exactly k Steps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps](https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics — O(k)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

From position `startPos`, take exactly `k` steps (+1 or -1). Count ways to reach `endPos`. Return mod 10⁹+7.

---

## 2. Key Insight

> Need `r` right steps and `l` left steps where `r + l = k` and `r - l = endPos - startPos`. So `r = (k + d) / 2`. Answer = C(k, r) if valid.

---

## 3. Approach: Combinatorics — O(k) ✅

```text
FUNCTION numberOfWays(startPos, endPos, k):
    d ← ABS(endPos - startPos)
    IF (k + d) MOD 2 ≠ 0 OR k < d:
        RETURN 0
    r ← (k + d) / 2
    RETURN COMBINATION(k, r) MOD (10^9 + 7)
```

---

## 4. Examples

**Example 1:**
```
Input: startPos = 1, endPos = 2, k = 3
Output: 3
Explanation: The three valid sequences are [+1,+1,-1], [+1,-1,+1], [-1,+1,+1].
```

**Example 2:**
```
Input: startPos = 2, endPos = 5, k = 3
Output: 0
Explanation: Distance is 3 but parity mismatch (k+d is even), so impossible.
```

---

## 5. Walkthrough

For Example 1:
- Distance `d = |2‑1| = 1`.
- `(k + d) = 4` is even, so `r = (3 + 1)/2 = 2` right steps.
- Choose 2 positions out of 3 steps for right moves: C(3,2) = 3.
Thus 3 ways.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) for computing combination |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **1D random walk = combination.** Steps right = `(k + distance) / 2`. Check parity and feasibility. Answer is C(k, right_steps).
