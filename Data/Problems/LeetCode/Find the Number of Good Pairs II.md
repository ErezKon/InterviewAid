# 3164. Find the Number of Good Pairs II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-good-pairs-ii](https://leetcode.com/problems/find-the-number-of-good-pairs-ii)
**Companies:** Airbus, Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Divisor Enumeration — O(n·√M + m) ✅](#4-approach-divisor-enumeration)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given 2 integer arrays `nums1` and `nums2` of lengths `n` and `m` respectively. You are also given a **positive** integer `k`.

A pair `(i, j)` is called **good** if `nums1[i]` is divisible by `nums2[j] * k` (`0 <= i <= n - 1`, `0 <= j <= m - 1`).

Return the total number of **good** pairs.

**Constraints:**
- `1 <= n, m <= 10⁵`
- `1 <= nums1[i], nums2[j] <= 10⁶`
- `1 <= k <= 10³`

---

## 2. Examples

```
Example 1:
  Input: nums1 = [1,3,4], nums2 = [1,3,4], k = 1
  Output: 5
  Explanation: The 5 good pairs are (0, 0), (1, 0), (1, 1), (2, 0), and (2, 2).

Example 2:
  Input: nums1 = [1,2,4,12], nums2 = [2,4], k = 3
  Output: 2
  Explanation: The 2 good pairs are (3, 0) and (3, 1).
```

---

## 3. Key Insight

> For each element in `nums1`, enumerate its divisors. If a divisor `d` is divisible by `k`, then `d/k` is a valid `nums2[j]` value. Count matches using a frequency map of `nums2`.

---

## 4. Approach: Divisor Enumeration — O(n·√M + m) ✅

```text
FUNCTION numberOfPairs(nums1, nums2, k):
    SET freq2 ← COUNTER(nums2)
    SET count ← 0
    FOR a IN nums1 DO
        IF a % k != 0 THEN CONTINUE
        SET target ← a / k
        FOR d ← 1 TO SQRT(target) DO
            IF target % d == 0 THEN
                IF d IN freq2 THEN SET count ← count + freq2[d]
                SET other ← target / d
                IF other != d AND other IN freq2 THEN SET count ← count + freq2[other]
    RETURN count
```

---

## 5. Walkthrough

Take Example 1:

| a (nums1) | a % k | target = a/k | Divisors of target | Matching nums2 values |
|-----------|-------|--------------|--------------------|-----------------------|
| 12        | 0     | 6            | 1,2,3,6            | 2 (2), 4 (6/2)        |
| 18        | 0     | 9            | 1,3,9              | 3 (3)                 |
| 24        | 0     | 12           | 1,2,3,4,6,12       | 2 (2), 4 (4)          |

The algorithm builds `freq2` = {2:1,3:1,4:1}. For each `a`, it enumerates divisors of `target` and adds the frequency of matching `nums2` entries, resulting in a total count of 5.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n·√(M/k) + m) |
| **Space** | O(m) — frequency map |

---

## 7. Follow-Up Questions

1. How would you adapt the solution if `k` could be zero?
2. Can the divisor enumeration be parallelized for faster processing on massive datasets?
3. What alternative data structures could replace the frequency map to improve cache performance?

---

## 8. Key Takeaway

> Enumerating divisors of `nums1[i]/k` and looking them up in a `nums2` frequency map turns a potential O(n·m) brute-force into near-linear time.
