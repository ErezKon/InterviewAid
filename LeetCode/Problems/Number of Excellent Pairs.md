# 2354. Number of Excellent Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-excellent-pairs](https://leetcode.com/problems/number-of-excellent-pairs)
**Companies:** Epifi

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort by Popcount — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs `(a, b)` from `nums` where `popcount(a OR b) + popcount(a AND b) >= k`. Pairs are ordered.

---

## 2. Key Insight

> `popcount(a OR b) + popcount(a AND b) = popcount(a) + popcount(b)`. So the problem reduces to counting pairs where `bits(a) + bits(b) >= k`. Sort by popcount and use binary search or two pointers.

---

## 3. Approach: Sort by Popcount — O(n log n) ✅

```
FUNCTION countExcellentPairs(nums, k):
    nums = UNIQUE(nums)
    bits = SORT([popcount(x) for x in nums])
    count = 0
    FOR i ← 0 TO len(bits) - 1:
        // Find smallest j where bits[i] + bits[j] >= k
        j = bisect_left(bits, k - bits[i])
        count += len(bits) - j
    RETURN count * 2 - (count of i where 2*bits[i] >= k)
    // Or simply count ordered pairs directly
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Key identity: `popcount(OR) + popcount(AND) = popcount(a) + popcount(b)`.** Reduces a complex bitwise problem to a simple two-sum on popcounts.
