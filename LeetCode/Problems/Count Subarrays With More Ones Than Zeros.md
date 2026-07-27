# 2031. Count Subarrays With More Ones Than Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros](https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary array `nums`, return the number of subarrays with **more ones than zeros**. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`

---

## Key Insight

Convert 0→-1 and compute prefix sums. A subarray `[i+1..j]` has more ones than zeros iff `prefix[j] > prefix[i]`. Count pairs where `prefix[j] > prefix[i]` with `j > i` — this is an **inversion-counting-like** problem solvable with a BIT (Fenwick tree) or merge sort.

---

## Approach

```
FUNCTION countSubarrays(nums):
    MOD = 10^9 + 7
    n = LENGTH(nums)
    // Convert: 0 → -1
    // Prefix sums range from -n to n, offset by n for indexing

    bit = BIT of size 2*n + 1
    prefix = 0
    bit.update(prefix + n, 1)   // prefix[0] = 0
    result = 0

    FOR i ← 0 TO n - 1 DO
        prefix += (1 IF nums[i] == 1 ELSE -1)
        // Count how many previous prefixes are < current prefix
        result = (result + bit.query(prefix + n - 1)) % MOD
        bit.update(prefix + n, 1)

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — BIT operations |
| **Space** | O(n) — BIT array |

---

## Key Takeaway

> **"More ones than zeros" in a subarray = positive prefix sum difference. Use a BIT/Fenwick tree to count how many previous prefix sums are strictly less than the current one, analogous to inversion counting.**
