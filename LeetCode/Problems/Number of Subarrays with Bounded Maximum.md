# 795. Number of Subarrays with Bounded Maximum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum)
**Companies:** Adobe, Amazon, Google, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: At-Most Subtraction — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays where the maximum element is in `[left, right]`.

---

## 2. Key Insight

> `count(max ∈ [left, right])` = `count(max ≤ right)` - `count(max ≤ left-1)`. Each "at-most" count uses a running window.

---

## 3. Approach: At-Most Subtraction — O(n) ✅

```
FUNCTION numSubarrayBoundedMax(nums, left, right):
    FUNCTION countAtMost(bound):
        count = 0; curr = 0
        FOR num IN nums:
            IF num <= bound: curr += 1
            ELSE: curr = 0
            count += curr
        RETURN count

    RETURN countAtMost(right) - countAtMost(left - 1)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **"Exactly in range" = "at most right" - "at most left-1".** Classic subtraction trick for bounded range problems. Running count resets on violation.
