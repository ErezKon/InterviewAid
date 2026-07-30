# 2616. Minimize the Maximum Difference of Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs](https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs)
**Companies:** Amazon, Google, Meta, Microsoft, Navi, Zeta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `p`, find `p` pairs of indices such that the **maximum difference** among all pairs is minimized. Each index can appear in at most one pair.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ p ≤ nums.length / 2`

---

## Examples

**Example 1:**
```
Input:  nums = [10, 1, 2, 7, 1, 3], p = 2
Output: 1
Explanation: Sort → [1,1,2,3,7,10]. Pairs: (1,1)=0, (2,3)=1. Max diff = 1.
```

---

## Key Insight

> **Binary search on the answer.** For a candidate max difference `d`, greedily count how many pairs with diff ≤ `d` we can form. After sorting, adjacent elements give the smallest differences — greedily pair consecutive elements if their diff ≤ `d`.

---

## Approach: Binary Search + Greedy — O(n log n + n log max) ✅

```
FUNCTION minimizeMax(nums, p):
    SORT nums
    lo ← 0
    hi ← nums[-1] - nums[0]

    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        // Greedily count pairs with diff ≤ mid
        pairs ← 0
        i ← 0
        WHILE i < n - 1 DO
            IF nums[i+1] - nums[i] ≤ mid THEN
                pairs ← pairs + 1
                i ← i + 2
            ELSE
                i ← i + 1
        IF pairs ≥ p THEN hi ← mid
        ELSE lo ← mid + 1

    RETURN lo
```

---

## Walkthrough

```
nums = [10,1,2,7,1,3], p = 2
Sorted: [1,1,2,3,7,10]

Binary search: lo=0, hi=9
mid=4: pairs greedily: (1,1)=0✓, (2,3)=1✓, (7,10)=3✓ → 3≥2 → hi=4
mid=2: (1,1)=0✓, (2,3)=1✓ → 2≥2 → hi=2
mid=1: (1,1)=0✓, (2,3)=1✓ → 2≥2 → hi=1
mid=0: (1,1)=0✓, skip 2,3,7,10 → 1<2 → lo=1

Return 1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + binary search | **O(n log n + n log max)** | **O(1)** |

---

## Follow-Up Questions

1. **Why sort first?** Sorting ensures smallest differences are between adjacent elements, making the greedy pairing optimal.
2. **Why skip i+2 on a successful pair?** Both indices are used — can't re-pair either.
3. **What if p = 0?** Return 0 — no pairs needed.

---

## Key Takeaway

> **Binary search on max difference + greedy validation** — sort the array, then for each candidate max diff, greedily pair consecutive elements. A powerful pattern for minimizing the maximum of a set of choices.

---
