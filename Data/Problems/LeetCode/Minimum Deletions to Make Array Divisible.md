# 2344. Minimum Deletions to Make Array Divisible

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Linkedin

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: GCD + Sort — O(n log n + m log M)](#approach-gcd--sort--on-log-n--m-log-m)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two arrays `nums` and `numsDivide`, return the **minimum number of deletions** from `nums` so that the **smallest** remaining element divides all elements of `numsDivide`. Return `-1` if impossible.

**Constraints:**
- `1 ≤ nums.length, numsDivide.length ≤ 10⁵`
- `1 ≤ nums[i], numsDivide[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input: nums = [2,3,2,4,3], numsDivide = [9,6,9,3,15]
Output: 2
Explanation: GCD(numsDivide) = 3. Sort nums = [2,2,3,3,4]. 
  Delete the two 2's → smallest is 3, which divides 3. Answer = 2.
```

**Example 2:**
```
Input: nums = [4,3,6], numsDivide = [8,2,6,10]
Output: -1
Explanation: GCD(numsDivide) = 2. No element in nums divides 2 (4→no, 3→no, 6→no).
```

---

## Key Insight

> An element divides all of `numsDivide` if and only if it divides their **GCD**. Compute the GCD once, then find the smallest element in `nums` that divides it — delete everything smaller.

---

## Approach: GCD + Sort — O(n log n + m log M) ✅

```
FUNCTION minOperations(nums, numsDivide):
    g = GCD of all numsDivide
    SORT nums
    FOR i, num IN enumerate(nums):
        IF g % num == 0: RETURN i
    RETURN -1
```

---

## Walkthrough

```
nums = [2, 3, 2, 4, 3], numsDivide = [9, 6, 9, 3, 15]
GCD(9,6,9,3,15) = 3
Sorted nums = [2, 2, 3, 3, 4]
```

| i | num | 3 % num == 0? | Action |
|---|-----|---------------|--------|
| 0 | 2 | 3%2=1 ≠ 0 | Continue |
| 1 | 2 | 3%2=1 ≠ 0 | Continue |
| 2 | 3 | 3%3=0 ✓ | Return 2 |

**Result:** Delete 2 elements → **2** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n + m log M) — sorting + GCD computation |
| **Space** | O(1) — in-place sort |

---

## Follow-Up Questions

1. **Why use GCD?** `x` divides all elements iff `x` divides their GCD — this collapses the `numsDivide` array into a single number.
2. **What if multiple elements have the same smallest value?** They all get deleted; we count by index in sorted order.
3. **Can we avoid sorting?** Use a min-heap or `nsmallest` to find elements in order, but sorting is simpler.

---

## Key Takeaway

> When checking divisibility against an entire array, **reduce to GCD first** — then the problem becomes finding the smallest element that divides a single number.
