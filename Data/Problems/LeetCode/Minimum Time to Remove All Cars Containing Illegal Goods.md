# 2167. Minimum Time to Remove All Cars Containing Illegal Goods

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-remove-all-cars-containing-illegal-goods](https://leetcode.com/problems/minimum-time-to-remove-all-cars-containing-illegal-goods)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix/Suffix DP — O(n)](#4-approach-prefixsuffix-dp--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary string `s` representing a train of cars (`'1'` = illegal), you can:
- Remove a car from the **left** end: costs 1
- Remove a car from the **right** end: costs 1
- Remove a car from **anywhere**: costs 2

Return the **minimum** time to remove all cars with illegal goods.

**Constraints:**
- `1 <= s.length <= 2 × 10⁵`

---

## 2. Examples

```
Example 1:
  Input: s = "1100101"
  Output: 5
  Explanation: Remove 2 from left (cost 2), remove 2 from right (cost 2), 
    remove middle '1' (cost 2) = 6. Better splits exist → 5.
```

---

## 3. Key Insight

> Split the string at some point. Left part: remove from the left end (cost = position+1) or remove individual cars (cost 2 each). Right part: similarly from the right. Use **prefix DP** for left cost and **suffix DP** for right cost. The answer = `min(prefix[i] + suffix[i])`.

Prefix DP: `left[i]` = min cost to clear all 1s in `s[0..i]`. For each `s[i]='1'`: either remove from left end (cost `i+1`) or remove individually (cost `left[i-1] + 2`).

---

## 4. Approach: Prefix/Suffix DP — O(n) ✅

```
FUNCTION minimumTime(s):
    n = len(s)
    left = [0] * n
    left[0] = int(s[0])
    FOR i ← 1 TO n-1:
        IF s[i] == '1':
            left[i] = MIN(left[i-1] + 2, i + 1)
        ELSE:
            left[i] = left[i-1]

    ans = left[n-1]  // clear everything from left
    right = 0
    FOR i ← n-1 DOWN TO 0:
        IF s[i] == '1':
            right = MIN(right + 2, n - i)
        ans = MIN(ans, left[max(0,i-1)] + right) IF i > 0 ELSE MIN(ans, right)

    RETURN ans
```

---

## 5. Walkthrough

```
For each split point, left[i] handles s[0..i], right handles s[i+1..n-1].
Minimum over all splits gives the answer.
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — two passes |
| **Space** | O(n) — prefix array (can optimize to O(1)) |

---

## 7. Key Takeaway

> **Three-option DP with split point** — at each position, choose between end-removal (cost = distance from end) or middle-removal (cost 2). Prefix + suffix DP finds the optimal split.
