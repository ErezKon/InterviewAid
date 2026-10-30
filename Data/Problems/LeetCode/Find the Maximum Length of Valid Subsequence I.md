# 3201. Find the Maximum Length of Valid Subsequence I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Four Patterns — O(n) ✅](#3-approach-four-patterns--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums`.

A subsequence `sub` of `nums` with length `x` is called **valid** if it satisfies:

- `(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2`.

Return the length of the **longest valid** subsequence of `nums`.

**Constraints:**
- `2 <= nums.length <= 2 × 10⁵`
- `1 <= nums[i] <= 10⁷`

---

## 2. Key Insight

> There are only 4 valid patterns based on parity. Count elements per parity and greedily build each alternating pattern to find the longest.

---

## 3. Approach: Four Patterns — O(n) ✅

```text
FUNCTION maximumLength(nums):
    // Patterns: all even, all odd, alternating even‑odd, alternating odd‑even
    allEven ← SUM(1 FOR x IN nums IF x % 2 == 0)
    allOdd  ← LENGTH(nums) - allEven
    // Alternating starting with even
    altEven ← 0; expect ← 0
    FOR num IN nums DO
        IF num % 2 == expect THEN
            altEven ← altEven + 1
            expect ← expect XOR 1
    // Alternating starting with odd
    altOdd ← 0; expect ← 1
    FOR num IN nums DO
        IF num % 2 == expect THEN
            altOdd ← altOdd + 1
            expect ← expect XOR 1
    RETURN MAX(allEven, allOdd, altEven, altOdd)
```

---

## 4. Examples

```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 4
  Explanation: The longest valid subsequence is [1, 2, 3, 4].

Example 2:
  Input: nums = [1,2,1,1,2,1,2]
  Output: 6
  Explanation: The longest valid subsequence is [1, 2, 1, 2, 1, 2].

Example 3:
  Input: nums = [1,3]
  Output: 2
  Explanation: The longest valid subsequence is [1, 3].
```

---

## 5. Walkthrough

Take `nums = [1,2,3,4,5]`.
1. **All even:** count = 2 (2,4).
2. **All odd:** count = 3 (1,3,5).
3. **Alternating even‑odd (start even):**
   - expect 0 → 1 (odd) skip, 2 (even) take → expect 1, 3 (odd) take → expect 0, 4 (even) take → expect 1, 5 (odd) take → length = 4.
4. **Alternating odd‑even (start odd):**
   - expect 1 → 1 (odd) take → expect 0, 2 (even) take → expect 1, 3 (odd) take → expect 0, 4 (even) take → expect 1, 5 (odd) take → length = 5.
Maximum of {2,3,4,5} is **5**.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — four linear passes |
| **Space** | O(1) |

---

## 7. Key Takeaway

> With mod 2, only four valid subsequence patterns exist. Enumerate all four greedily and return the longest.
