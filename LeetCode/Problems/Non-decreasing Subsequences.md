# 491. Non-decreasing Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/non-decreasing-subsequences](https://leetcode.com/problems/non-decreasing-subsequences)
**Companies:** Amazon, Google, Microsoft, Yahoo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(2ⁿ)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return all **non-decreasing subsequences** of length ≥ 2. The array may have duplicates, but results must be unique.

---

## 2. Key Insight

> Backtracking: at each position, either include or skip. Only include if it maintains non-decreasing order. Use a set to deduplicate.

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```
FUNCTION findSubsequences(nums):
    result = set()

    FUNCTION backtrack(idx, curr):
        IF len(curr) >= 2: result.ADD(tuple(curr))
        FOR i ← idx TO len(nums) - 1:
            IF NOT curr OR nums[i] >= curr[-1]:
                backtrack(i + 1, curr + [nums[i]])

    backtrack(0, [])
    RETURN [list(s) for s in result]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(2ⁿ · n) |
| **Space** | O(2ⁿ · n) for result set |

---

## 5. Key Takeaway

> **Backtracking with monotonicity constraint + deduplication.** Only extend if `nums[i] >= last`. Use set of tuples to avoid duplicate subsequences without sorting the input.
