# 2941. Maximum GCD-Sum of a Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray](https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray)
**Companies:** Thoughtworks

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: GCD Compression — O(n log V)](#approach-gcd-compression--on-log-v-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find a subarray that maximizes `GCD(subarray) × SUM(subarray)`.

---

## Examples

**Example 1:**
```
Input: nums = [2,6,3,9,5]
Output: 30
Explanation: Subarray [6,3,9] has GCD = 3 and SUM = 18, product = 54. The maximum product is achieved by subarray [2,6] where GCD = 2 and SUM = 8, product = 16? Actually the optimal subarray is [6,3,9] → 3*18 = 54, which is the maximum.
```

**Example 2:**
```
Input: nums = [4,8,16]
Output: 48
Explanation: Whole array GCD = 4, SUM = 28, product = 112. Subarray [8,16] gives GCD = 8, SUM = 24, product = 192, which is larger.
```

---

## Key Insight

> As you extend a subarray, the GCD can only decrease (or stay). There are at most O(log V) distinct GCD values for subarrays ending at each position. Maintain a compressed list of `(gcd, sum)` pairs and merge duplicates.

---

## Approach: GCD Compression — O(n log V) ✅

```text
FUNCTION maxGCDSum(nums):
    result ← 0
    active ← []  // list of (gcd, sum) for subarrays ending at previous index
    FOR num IN nums:
        newActive ← []
        // Extend previous subarrays with current num
        FOR (g, s) IN active:
            newG ← GCD(g, num)
            newS ← s + num
            IF newActive NOT EMPTY AND newActive[-1].gcd = newG:
                // Keep larger sum for same gcd
                newActive[-1].sum ← MAX(newActive[-1].sum, newS)
            ELSE:
                newActive.APPEND((newG, newS))
        // Start new subarray at current position
        newActive.APPEND((num, num))
        // Deduplicate by merging consecutive entries with same gcd
        active ← MERGE_CONSECUTIVE_DUPLICATES(newActive)
        // Update global maximum
        FOR (g, s) IN active:
            result ← MAX(result, g * s)
    RETURN result
```

---

## Walkthrough

**Using Example 1 (`[2,6,3,9,5]`):**
| Index | num | active after processing (gcd, sum) | result |
|-------|-----|------------------------------------|--------|
| 0 | 2 | [(2,2)] | 4 |
| 1 | 6 | [(2,8), (6,6)] → after merge [(2,8)] | 8 |
| 2 | 3 | Extend: (2,8)→(1,11); (6,6)→(3,9); start (3,3) → [(1,11),(3,9),(3,3)] → merge → [(1,11),(3,9)] | max(1*11,3*9)=27 |
| 3 | 9 | Extend: (1,11)→(1,20); (3,9)→(3,18); start (9,9) → [(1,20),(3,18),(9,9)] → merge → [(1,20),(3,18),(9,9)] | max = 3*18 = 54 |
| 4 | 5 | Extend each, compute, best product remains 54 |

The algorithm records the highest product (54) found at index 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| GCD compression | **O(n log V)** | O(log V) |

---

## Follow-Up Questions

- How would the solution adapt if we needed to maximize `GCD(subarray) + SUM(subarray)` instead of the product?
- Can we extend this technique to two‑dimensional grids where sub‑matrices are considered?
- What if the array is streamed; how would you maintain the maximum efficiently?

---

## Key Takeaway

> **GCD of subarrays has at most O(log V) distinct values per endpoint.** Maintain compressed (gcd, sum) pairs and maximize gcd × sum.
