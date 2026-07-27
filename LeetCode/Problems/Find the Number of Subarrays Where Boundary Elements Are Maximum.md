# 3113. Find the Number of Subarrays Where Boundary Elements Are Maximum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum](https://leetcode.com/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum)
**Companies:** Amazon, Linkedin

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack + Counting — O(n) ✅](#3-approach-monotonic-stack--counting--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays where the first and last elements are both equal to the maximum element in that subarray.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> A subarray `[l..r]` satisfies the condition iff `nums[l] == nums[r] == max(nums[l..r])`. Use a monotonic stack to track positions of each value and count valid pairs efficiently.

---

## 3. Approach: Monotonic Stack + Counting — O(n) ✅

```
FUNCTION numberOfSubarrays(nums):
    // For each value, find all positions where it occurs
    // A pair (i, j) with nums[i] == nums[j] == v is valid iff
    //   no element > v exists between i and j
    // Use monotonic stack to efficiently find valid pairs

    stack ← []; count ← 0
    FOR i ← 0 TO n - 1 DO
        WHILE stack NOT EMPTY AND nums[stack.TOP()] < nums[i] DO
            stack.POP()
        // Count consecutive same-value elements on stack top
        IF stack NOT EMPTY AND nums[stack.TOP()] == nums[i] THEN
            // This forms valid pairs with all same-value elements in current group
            // Track group count and add to result
            ...
        stack.PUSH(i)

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — monotonic stack |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Monotonic stack** identifies valid boundary pairs where no larger element exists in between. Group consecutive same-value elements for efficient counting.
