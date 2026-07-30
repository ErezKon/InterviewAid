# 2439. Minimize Maximum of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-of-array](https://leetcode.com/problems/minimize-maximum-of-array)
**Companies:** Amazon, Microsoft, Oracle, Paytm

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, you can repeatedly pick `i > 0` and move 1 unit from `nums[i]` to `nums[i-1]` (decrement `nums[i]`, increment `nums[i-1]`). Minimize the **maximum value** in the array.

**Constraints:**
- `2 ≤ n ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [3, 7, 1, 6]
Output: 5
Explanation: Spread values leftward. Max prefix avg (rounded up) = 5.
```

---

## Key Insight

> You can only move values **leftward** (from right to left). The minimum possible maximum for the first `i+1` elements is `⌈prefixSum[0..i] / (i+1)⌉`. The answer is the max of these prefix averages across all prefixes.

---

## Approach: Prefix Average — O(n) ✅

```
FUNCTION minimizeArrayValue(nums):
    result ← 0
    prefixSum ← 0
    FOR i ← 0 TO LEN(nums) - 1 DO
        prefixSum ← prefixSum + nums[i]
        result ← MAX(result, CEIL(prefixSum / (i + 1)))
    RETURN result
```

---

## Walkthrough

```
nums = [3, 7, 1, 6]

i=0: prefix=3,  avg=⌈3/1⌉=3.  result=3
i=1: prefix=10, avg=⌈10/2⌉=5. result=5
i=2: prefix=11, avg=⌈11/3⌉=4. result=5
i=3: prefix=17, avg=⌈17/4⌉=5. result=5

Return 5 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix average | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Prefix average is the bottleneck** — since values can only flow left, the minimum achievable max for a prefix of length k is `⌈sum/k⌉`. The answer is the maximum of these over all prefixes.

---
