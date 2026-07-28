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

Given arrays `nums1`, `nums2`, and integer `k`, count pairs `(i, j)` where `nums1[i] % (nums2[j] * k) == 0`.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 50`
- `1 <= nums1[i], nums2[j] <= 10^5`
- `1 <= k <= 10^5`

---

## 2. Examples

**Example 1:**
```
nums1 = [8, 12, 16]
nums2 = [2, 4]
k = 2
```
Pairs satisfying the condition: `(8,2)`, `(12,2)`, `(16,2)`, `(8,4)`, `(12,4)`, `(16,4)` → **6** pairs.

**Example 2:**
```
nums1 = [5, 10]
nums2 = [1, 5]
k = 1
```
Valid pairs: `(5,1)`, `(5,5)`, `(10,1)`, `(10,5)` → **4** pairs.

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

Consider Example 1:

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

> With small input sizes, a straightforward double‑loop brute‑force check is both simple to implement and optimal.
