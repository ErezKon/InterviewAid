# 1846. Maximum Element After Decreasing and Rearranging

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging](https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Greedy — O(n log n)](#approach-sort--greedy--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array, you can rearrange and decrease elements. The first element must be 1. Adjacent elements differ by at most 1. Maximize the last (largest) element.

---

## Key Insight

> Sort the array. Walk through: each element can be at most `prev + 1`. Greedily set each to `min(arr[i], prev + 1)`. The final value is the answer.

---

## Approach: Sort + Greedy — O(n log n) ✅

```text
FUNCTION maximumElementAfterDecrementingAndRearranging(arr):
    SORT arr
    SET arr[0] ← 1
    FOR i ← 1 TO LEN(arr) - 1:
        SET arr[i] ← MIN(arr[i], arr[i-1] + 1)
    RETURN arr[LEN(arr) - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy | **O(n log n)** | O(1) |

---

## Examples

| arr | Output |
|-----|--------|
| `[3,2,5,1,7]` | `5` |
| `[1,1,1,1]` | `1` |

*Explanation*: After sorting, the array becomes `[1,1,2,3,5]`. Applying the greedy cap yields `[1,2,3,4,5]`, so the maximum element is `5`.

---

## Walkthrough

Consider `arr = [3,2,5,1,7]`.

1. **Sort** → `[1,2,3,5,7]`.
2. **Initialize** first element to `1`.
3. **i=1**: `min(2, 1+1)=2` → array `[1,2,3,5,7]`.
4. **i=2**: `min(3, 2+1)=3` → unchanged.
5. **i=3**: `min(5, 3+1)=4` → array `[1,2,3,4,7]`.
6. **i=4**: `min(7, 4+1)=5` → final array `[1,2,3,4,5]`.
7. Return last element `5`.

---

## Follow-Up Questions

- How would the solution change if the first element could be any value?
- Can you solve the problem in O(n) time without sorting?
- What if the adjacency constraint was `|a[i] - a[i-1]| ≤ k` for a given `k`?

---

## Key Takeaway

> **Sort and greedily cap each element to prev + 1.** This maximizes the achievable final value under the adjacency constraint.
