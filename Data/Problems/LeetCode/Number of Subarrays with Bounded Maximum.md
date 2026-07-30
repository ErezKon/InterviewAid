# 795. Number of Subarrays with Bounded Maximum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum)
**Companies:** Adobe, Amazon, Google, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: At-Most Subtraction — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count subarrays where the maximum element is in `[left, right]`.

---

## 2. Examples

**Example 1:**
```
Input: nums = [2,1,4,3], left = 2, right = 3
Output: 3
Explanation: The valid subarrays are [2], [2,1], [3].
```

**Example 2:**
```
Input: nums = [2,9,2,5,6], left = 2, right = 8
Output: 7
Explanation: The valid subarrays are [2], [2,2], [2,2,5], [2,5], [5], [6], [2,5,6].
```

---

## 3. Approach: At-Most Subtraction — O(n) ✅

The count of subarrays with maximum in `[left, right]` equals the count of subarrays with maximum ≤ `right` minus the count with maximum ≤ `left‑1`. Each "at‑most" count can be obtained with a single pass that maintains the length of the current valid window.

```text
FUNCTION numSubarrayBoundedMax(nums, left, right):
    FUNCTION countAtMost(bound):
        SET count ← 0
        SET current ← 0
        FOR num IN nums:
            IF num ≤ bound:
                SET current ← current + 1
            ELSE:
                SET current ← 0
            SET count ← count + current
        RETURN count
    RETURN countAtMost(right) - countAtMost(left - 1)
```

---

## 4. Walkthrough

Consider the first example `nums = [2,1,4,3]`, `left = 2`, `right = 3`.

| Index | num | current (≤ right) | countAtMost(right) | current (≤ left‑1) | countAtMost(left‑1) |
|-------|-----|-------------------|--------------------|--------------------|----------------------|
| 0     | 2   | 1                 | 1                  | 0 (2 > 1)          | 0                    |
| 1     | 1   | 2                 | 3 (=1+2)            | 1 (1 ≤ 1)          | 1 (=0+1)              |
| 2     | 4   | 0 (4 > 3)         | 3 (=3+0)            | 0 (4 > 1)          | 1 (=1+0)              |
| 3     | 3   | 1                 | 4 (=3+1)            | 0 (3 > 1)          | 1 (=1+0)              |

Final result: `4 - 1 = 3` valid subarrays.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would you modify the solution to return the list of all valid subarrays?
- Can the same technique be applied to count subarrays with sum within a range?
- What changes are needed if the array contains negative numbers and the range is based on sum rather than maximum?

---

## 7. Key Takeaway

> **"Exactly in range" = "at most right" - "at most left‑1".** Classic subtraction trick for bounded range problems. Running count resets on violation.
