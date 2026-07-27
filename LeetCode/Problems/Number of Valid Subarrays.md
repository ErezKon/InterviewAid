# 1063. Number of Valid Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-subarrays](https://leetcode.com/problems/number-of-valid-subarrays)
**Companies:** Hulu

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays where the leftmost element is ≤ all other elements.

---

## 2. Key Insight

> For each element, find the next smaller element (using monotonic stack). All subarrays starting at `i` and ending before the next smaller element are valid.

---

## 3. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION validSubarrays(nums):
    n = len(nums)
    stack = []
    result = 0
    FOR i ← n-1 DOWNTO 0:
        WHILE stack AND nums[stack[-1]] >= nums[i]:
            stack.POP()
        rightBound = stack[-1] IF stack ELSE n
        result += rightBound - i
        stack.APPEND(i)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Next smaller element via monotonic stack.** Valid subarrays from `i` extend to the position just before the next smaller element. Classic "next greater/smaller" pattern.
