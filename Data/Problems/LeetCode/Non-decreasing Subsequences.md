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

Given an integer array `nums`, return *all the different possible non-decreasing subsequences of the given array with at least two elements*. You may return the answer in **any order**.

**Constraints:**

- `1 <= nums.length <= 15`
- `-100 <= nums[i] <= 100`

---

## 2. Key Insight

> Backtracking: at each position, either include or skip. Only include if it maintains non-decreasing order. Use a set to deduplicate.

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```text
FUNCTION findSubsequences(nums):
    result ← set()

    FUNCTION backtrack(idx, curr):
        IF LENGTH(curr) ≥ 2:
            result.ADD(TUPLE(curr))
        FOR i ← idx TO LENGTH(nums) - 1:
            IF NOT curr OR nums[i] ≥ curr[-1]:
                backtrack(i + 1, curr + [nums[i]])

    backtrack(0, [])
    RETURN [LIST(s) FOR s IN result]
```

---

## 4. Examples

```
Example 1:
  Input: nums = [4,6,7,7]
  Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

```
Example 2:
  Input: nums = [4,4,3,2,1]
  Output: [[4,4]]
```

---

## 5. Walkthrough

**Example:** `[4,6,7,7]`
1. Start with empty `curr`. At index 0, include `4` → `curr=[4]`.
2. Recurse index 1, include `6` (≥4) → `curr=[4,6]` (recorded).
3. Continue adding `7` and another `7`, recording each valid subsequence.
4. Backtrack to explore branches where elements are skipped, generating all combinations while maintaining non‑decreasing order.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(2ⁿ · n) — each subset explored, copying `curr` costs up to n |
| **Space** | O(2ⁿ · n) for result set plus recursion stack |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to return subsequences in lexicographic order?
- Can you solve the problem in O(n²) time using dynamic programming?

---

## 8. Key Takeaway

> **Backtracking with monotonicity constraint + deduplication.** Only extend if `nums[i] >= last`. Use a set of tuples to avoid duplicate subsequences without sorting the input.
