# 3162. Find the Number of Good Pairs I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-good-pairs-i](https://leetcode.com/problems/find-the-number-of-good-pairs-i)
**Companies:** Airbus, Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Brute Force — O(n·m) ✅](#3-approach-brute-force--onm-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given 2 integer arrays `nums1` and `nums2` of lengths `n` and `m` respectively. You are also given a **positive** integer `k`.

A pair `(i, j)` is called **good** if `nums1[i]` is divisible by `nums2[j] * k` (`0 <= i <= n - 1`, `0 <= j <= m - 1`).

Return the total number of **good** pairs.

**Constraints:**
- `1 <= n, m <= 50`
- `1 <= nums1[i], nums2[j] <= 50`
- `1 <= k <= 50`

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

## 3. Approach: Brute Force — O(n·m) ✅

```text
FUNCTION numberOfPairs(nums1, nums2, k):
    SET count ← 0
    FOR a IN nums1 DO
        FOR b IN nums2 DO
            IF b * k != 0 AND a % (b * k) == 0 THEN
                SET count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider Example 1:

| i (nums1) | j (nums2) | b * k | a % (b * k) | Pair counted? |
|-----------|----------|-------|-------------|----------------|
| 8         | 2        | 4     | 0           | ✅ |
| 8         | 4        | 8     | 0           | ✅ |
| 12        | 2        | 4     | 0           | ✅ |
| 12        | 4        | 8     | 4           | ❌ |
| 16        | 2        | 4     | 0           | ✅ |
| 16        | 4        | 8     | 0           | ✅ |

The algorithm iterates all six possible `(i, j)` combos, checks the modulus condition, and increments the counter when true, yielding a final count of 6.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you improve the solution if `nums1` and `nums2` each contained up to 10⁵ elements?
2. Can you adapt the approach to return the list of all valid pairs instead of just the count?
3. What changes are needed if `k` can be zero?

---

## 7. Key Takeaway

> With small input sizes, a straightforward double-loop brute-force check is both simple to implement and optimal.
