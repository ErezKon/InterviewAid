# 2941. Maximum GCD-Sum of a Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray](https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray)
**Companies:** Thoughtworks

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: GCD Compression — O(n log V)](#approach-gcd-compression--on-log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find a subarray that maximizes `GCD(subarray) × SUM(subarray)`.

---

## Key Insight

> As you extend a subarray, the GCD can only decrease (or stay). There are at most O(log V) distinct GCD values for subarrays ending at each position. Maintain a compressed list of `(gcd, sum)` pairs and merge duplicates.

---

## Approach: GCD Compression — O(n log V) ✅

```
FUNCTION maxGCDSum(nums):
    result = 0
    // active = list of (gcd, sum) for subarrays ending at current position
    active = []
    FOR num IN nums:
        newActive = []
        FOR (g, s) IN active:
            newG = GCD(g, num)
            newS = s + num
            IF newActive and newActive[-1].gcd == newG:
                newActive[-1].sum = MAX(newActive[-1].sum, newS)
            ELSE:
                newActive.APPEND((newG, newS))
        newActive.APPEND((num, num))    // single-element subarray
        // Merge and deduplicate
        active = merged newActive
        FOR (g, s) IN active:
            result = MAX(result, g * s)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| GCD compression | **O(n log² V)** | O(log V) |

---

## Key Takeaway

> **GCD of subarrays has at most O(log V) distinct values per endpoint.** Maintain compressed (gcd, sum) pairs and maximize gcd × sum.
