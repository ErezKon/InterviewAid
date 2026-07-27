# 2400. Number of Ways to Reach a Position After Exactly k Steps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps](https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics — O(k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

From position `startPos`, take exactly `k` steps (+1 or -1). Count ways to reach `endPos`. Return mod 10⁹+7.

---

## 2. Key Insight

> Need `r` right steps and `l` left steps where `r + l = k` and `r - l = endPos - startPos`. So `r = (k + d) / 2`. Answer = C(k, r) if valid.

---

## 3. Approach: Combinatorics — O(k) ✅

```
FUNCTION numberOfWays(startPos, endPos, k):
    d = abs(endPos - startPos)
    IF (k + d) % 2 != 0 OR k < d: RETURN 0
    r = (k + d) / 2
    RETURN C(k, r) % (10^9 + 7)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) for computing combination |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **1D random walk = combination.** Steps right = `(k + distance) / 2`. Check parity and feasibility. Answer is C(k, right_steps).
