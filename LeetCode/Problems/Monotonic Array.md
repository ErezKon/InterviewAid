# 896. Monotonic Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/monotonic-array](https://leetcode.com/problems/monotonic-array)
**Companies:** Amazon, Bloomberg, Capital One, Google, Meta, Ozon, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Flags — O(n)](#4-approach-two-flags--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Return `true` if the array is monotone increasing **or** monotone decreasing.

**Constraints:**
- `1 <= nums.length <= 10⁵`

---

## 2. Examples

```
Example 1: [1,2,2,3] → true (increasing)
Example 2: [6,5,4,4] → true (decreasing)
Example 3: [1,3,2] → false
```

---

## 3. Key Insight

> Track two boolean flags: `increasing` and `decreasing`. If any pair increases, `decreasing = false` and vice versa. Valid if either flag remains true.

---

## 4. Approach: Two Flags — O(n) ✅

```
FUNCTION isMonotonic(nums):
    increasing = decreasing = true
    FOR i ← 1 TO n - 1:
        IF nums[i] > nums[i-1]: decreasing = false
        IF nums[i] < nums[i-1]: increasing = false
    RETURN increasing OR decreasing
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Two-flag check** — simultaneously verify both directions. Array is monotonic if it never both increases and decreases.
