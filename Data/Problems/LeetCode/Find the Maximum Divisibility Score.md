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

You are given two integer arrays `nums` and `divisors`.

The **divisibility score** of `divisors[i]` is the number of indices `j` such that `nums[j]` is divisible by `divisors[i]`.

Return the integer `divisors[i]` with the **maximum** divisibility score. If multiple integers have the maximum score, return the smallest one.

**Constraints:**
- `1 <= nums.length, divisors.length <= 1000`
- `1 <= nums[i], divisors[i] <= 10⁹`

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

```
Example 1:
  Input: nums = [2,9,15,50], divisors = [5,3,7,2]
  Output: 2
  Explanation:
  The divisibility score of divisors[0] is 2 since nums[2] and nums[3] are divisible by 5.
  The divisibility score of divisors[1] is 2 since nums[1] and nums[2] are divisible by 3.
  The divisibility score of divisors[2] is 0 since none of the numbers in nums is divisible by 7.
  The divisibility score of divisors[3] is 2 since nums[0] and nums[3] are divisible by 2.
  As divisors[0], divisors[1], and divisors[3] have the same divisibility score, we return the
  smaller one which is divisors[3].

Example 2:
  Input: nums = [4,7,9,3,9], divisors = [5,2,3]
  Output: 3
  Explanation:
  The divisibility score of divisors[0] is 0 since none of numbers in nums is divisible by 5.
  The divisibility score of divisors[1] is 1 since only nums[0] is divisible by 2.
  The divisibility score of divisors[2] is 3 since nums[2], nums[3] and nums[4] are divisible by 3.

Example 3:
  Input: nums = [20,14,21,10], divisors = [10,16,20]
  Output: 10
  Explanation:
  The divisibility score of divisors[0] is 2 since nums[0] and nums[3] are divisible by 10.
  The divisibility score of divisors[1] is 0 since none of the numbers in nums is divisible by 16.
  The divisibility score of divisors[2] is 1 since nums[0] is divisible by 20.
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