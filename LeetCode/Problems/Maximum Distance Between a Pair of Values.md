# 1855. Maximum Distance Between a Pair of Values

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-distance-between-a-pair-of-values](https://leetcode.com/problems/maximum-distance-between-a-pair-of-values)
**Companies:** Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Two Pointers — O(n + m)](#approach-two-pointers--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two **non-increasing** arrays `nums1` and `nums2`, find the maximum `j - i` such that `nums1[i] ≤ nums2[j]` and `i ≤ j`.

---

## Key Insight

> Both arrays are sorted in non-increasing order. Use two pointers: advance j as far as possible while `nums1[i] ≤ nums2[j]`, then advance i. Track max `j - i`.

---

## Approach: Two Pointers — O(n + m) ✅

```text
FUNCTION maxDistance(nums1, nums2):
    i ← 0
    j ← 0
    result ← 0
    WHILE i < LEN(nums1) AND j < LEN(nums2):
        IF nums1[i] > nums2[j]:
            i ← i + 1
        ELSE:
            result ← MAX(result, j - i)
            j ← j + 1
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | **O(n + m)** | O(1) |

---

## Examples

| nums1 | nums2 | Output |
|-------|-------|--------|
| `[9,8,7,6,5]` | `[9,8,7,6,5]` | `4` |
| `[5,4,3]` | `[6,5,4,3,2]` | `4` |

*Explanation*: In the first example, the farthest valid pair is `i=0, j=4`.

---

## Walkthrough

Consider `nums1 = [5,4,3]` and `nums2 = [6,5,4,3,2]`.

| Step | i | j | nums1[i] | nums2[j] | result |
|------|---|---|----------|----------|--------|
| Init | 0 | 0 | 5 | 6 | 0 |
| 1 | 0 | 0 | 5 ≤ 6 → result=0, j++ | 0 | 1 |
| 2 | 0 | 1 | 5 ≤ 5 → result=1, j++ | 0 | 2 |
| 3 | 0 | 2 | 5 > 4 → i++ | 1 | 2 |
| 4 | 1 | 2 | 4 ≤ 4 → result=2, j++ | 1 | 3 |
| 5 | 1 | 3 | 4 > 3 → i++ | 2 | 3 |
| 6 | 2 | 3 | 3 ≤ 3 → result=3, j++ | 2 | 4 |
| End | - | - | - | - | max distance = 4 |

---

## Follow-Up Questions

- How would the solution change if the arrays were sorted in non‑decreasing order?
- Can you adapt the algorithm to return the actual pair of indices instead of just the distance?
- What if the arrays contain duplicate values and you need the lexicographically smallest pair?

---

## Key Takeaway

> **Non-increasing arrays + pair distance = two pointers.** Advance j to maximize distance while maintaining the constraint.
