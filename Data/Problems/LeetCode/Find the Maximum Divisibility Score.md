# 2644. Find the Maximum Divisibility Score

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-divisibility-score](https://leetcode.com/problems/find-the-maximum-divisibility-score)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force Count — O(n·m) ✅](#2-approach-brute-force-count--onm-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given arrays `nums` and `divisors`, for each divisor count how many elements in `nums` it divides evenly. Return the divisor with the maximum count. If tied, return the smallest divisor.

**Constraints:**
- `1 <= nums.length, divisors.length <= 1000`

---

## 2. Approach: Brute Force Count — O(n·m) ✅

```text
FUNCTION maxDivScore(nums, divisors):
    bestDiv ← -1; bestCount ← -1
    FOR d IN SORTED(divisors) DO
        count ← SUM(1 for x in nums if x % d == 0)
        IF count > bestCount THEN
            bestCount ← count
            bestDiv ← d
    RETURN bestDiv
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [3,1,2,4,5], divisors = [2,3,4]
Output: 2
Explanation: Divisor 2 divides 2,4 (2 numbers). Divisor 3 divides 3 (1). Divisor 4 divides 4 (1). Max count is 2, so return 2.
```

**Example 2:**
```
Input: nums = [1,2,3], divisors = [2,3]
Output: 3
Explanation: Divisor 2 divides 2 (1). Divisor 3 divides 3 (1). Tie → return smaller divisor 2? Actually both count 1, smallest divisor is 2, so output 2.
```

---

## 4. Walkthrough

Consider the first example. After sorting divisors → `[2,3,4]`.
1. **d = 2:** Check each `num`: 3%2≠0, 1%2≠0, 2%2=0, 4%2=0, 5%2≠0 → count = 2. Update bestDiv = 2, bestCount = 2.
2. **d = 3:** Only 3%3=0 → count = 1 (less than bestCount).
3. **d = 4:** Only 4%4=0 → count = 1.
Result is 2.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Simple brute force: for each divisor, count divisible elements. Sort divisors first to auto‑handle the tie‑breaking (smallest divisor wins).