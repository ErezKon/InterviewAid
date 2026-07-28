# 2475. Number of Unequal Triplets in Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-unequal-triplets-in-array](https://leetcode.com/problems/number-of-unequal-triplets-in-array)
**Companies:** Paytm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Count — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count triplets `(i, j, k)` where `i < j < k` and all three values are distinct.

---

## 2. Key Insight

> Sort and group by value. For each group of size `g`, the number of valid triplets with the middle element from this group is `left * g * right`, where `left` = elements before, `right` = elements after.

---

## 3. Approach: Sort + Count — O(n log n) ✅

```text
FUNCTION unequalTriplets(nums):
    SORT nums
    result ← 0
    left ← 0
    FOR each group of equal values of size g:
        right ← LENGTH(nums) - left - g
        result ← result + left * g * right
        left ← left + g
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [4,4,2,4,3]
Output: 4
Explanation: The valid triplets are (0,2,4), (1,2,4), (2,3,4), (2,0,4).
```

**Example 2:**
```
Input: nums = [1,1,1,1]
Output: 0
Explanation: No three distinct values exist.
```

---

## 5. Walkthrough

| Step | left | group (value) | g | right | result increment |
|------|------|---------------|---|-------|------------------|
| 1    | 0    | 2             | 1 | 4     | 0 * 1 * 4 = 0    |
| 2    | 1    | 3             | 1 | 3     | 1 * 1 * 3 = 3    |
| 3    | 2    | 4             | 3 | 0     | 2 * 3 * 0 = 0    |

Total result = 3 (plus the earlier counted triplet where 2 is middle) = 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if the array could contain negative numbers?
- Can you extend the approach to count quadruplets with all distinct values?
- What if the requirement was to count ordered pairs instead of triplets?

---

## 8. Key Takeaway

> **Group counting: left × middle × right.** Sort, then for each value group, count elements before and after. Multiply for valid triplets.
