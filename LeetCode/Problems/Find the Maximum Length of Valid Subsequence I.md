# 3201. Find the Maximum Length of Valid Subsequence I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Four Patterns — O(n) ✅](#3-approach-four-patterns--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, find the maximum length of a subsequence where consecutive pairs all have the **same sum mod 2**. The valid patterns are: all even, all odd, alternating even-odd, or alternating odd-even.

**Constraints:**
- `1 <= nums.length <= 2 × 10⁵`

---

## 2. Key Insight

> There are only 4 valid patterns based on parity. Count elements per parity and greedily build each alternating pattern to find the longest.

---

## 3. Approach: Four Patterns — O(n) ✅

```
FUNCTION maximumLength(nums):
    // Valid: consecutive pairs have same sum mod 2
    // Patterns: all even, all odd, alternating even-odd, alternating odd-even
    allEven = SUM(1 for x in nums if x % 2 == 0)
    allOdd = len(nums) - allEven
    // Alternating: greedy
    alt = 0; expect = 0
    FOR num IN nums:
        IF num % 2 == expect: alt += 1; expect ^= 1
    alt2 = 0; expect = 1
    FOR num IN nums:
        IF num % 2 == expect: alt2 += 1; expect ^= 1
    RETURN MAX(allEven, allOdd, alt, alt2)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — four linear passes |
| **Space** | O(1) |

---

## 5. Key Takeaway

> With mod 2, only 4 valid subsequence patterns exist. Enumerate all four greedily and return the longest.
