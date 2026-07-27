# 1524. Number of Sub-arrays With Odd Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum)
**Companies:** Amazon, Bloomberg, Directi, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Parity — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays with an odd sum. Return mod 10⁹+7.

---

## 2. Key Insight

> Subarray sum parity = difference of prefix sum parities. Odd sum ↔ prefix sums with different parities. Track counts of even and odd prefix sums.

---

## 3. Approach: Prefix Parity — O(n) ✅

```
FUNCTION numOfSubarrays(arr):
    MOD = 10^9 + 7
    oddCount = evenCount = 0
    evenCount = 1    // empty prefix
    prefixSum = 0
    result = 0

    FOR num IN arr:
        prefixSum += num
        IF prefixSum % 2 == 0:
            result = (result + oddCount) % MOD
            evenCount += 1
        ELSE:
            result = (result + evenCount) % MOD
            oddCount += 1

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Prefix parity counting.** Even prefix - odd prefix = odd sum. Track even/odd prefix sum counts and pair them.
