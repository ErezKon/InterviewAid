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

You are given a **0-indexed** integer array `nums` and an integer `p`. Find `p` pairs of indices of `nums` such that the **maximum** difference amongst all the pairs is **minimized**. Also, ensure no index appears more than once amongst the `p` pairs.

Note that for a pair of elements at the index `i` and `j`, the difference of this pair is `|nums[i] - nums[j]|`, where `|x|` represents the **absolute** **value** of `x`.

Return *the **minimum** **maximum** difference among all* `p` *pairs.* We define the maximum of an empty set to be zero.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`
- `0 ≤ p ≤ (nums.length)/2`

---

## Examples

```
Example 1:
  Input: nums = [10,1,2,7,1,3], p = 2
  Output: 1
  Explanation: The first pair is formed from the indices 1 and 4, and the second pair is formed from the indices 2 and 5.
  The maximum difference is max(|nums[1] - nums[4]|, |nums[2] - nums[5]|) = max(0, 1) = 1. Therefore, we return 1.
```

```
Example 2:
  Input: nums = [4,2,1,2], p = 1
  Output: 0
  Explanation: Let the indices 1 and 3 form a pair. The difference of that pair is |2 - 2| = 0, which is the minimum we can attain.
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
