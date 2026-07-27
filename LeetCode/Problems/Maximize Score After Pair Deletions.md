# 3496. Maximize Score After Pair Deletions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-score-after-pair-deletions](https://leetcode.com/problems/maximize-score-after-pair-deletions)
**Companies:** Drw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(n)](#approach-greedy--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, repeatedly delete pairs of elements and add their sum to your score until at most one element remains. Maximize the total score.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`

---

## Key Insight

> Every element except possibly one contributes to the score. If the array length is even, all elements are paired and the total score = sum of all elements. If odd, exclude the smallest element. With negative numbers, excluding the most negative (smallest) element maximizes the sum.

---

## Approach: Greedy — O(n) ✅

```
FUNCTION maxScore(nums):
    total = SUM(nums)
    IF len(nums) % 2 == 1:
        RETURN total - MIN(nums)
    RETURN total
```

If all pairings contribute `a + b` to the score, the total is always the sum of all elements minus at most one leftover.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(1) |

---

## Key Takeaway

> **When pair deletions sum both elements, the total score = array sum minus the excluded element (if odd length).** Exclude the minimum to maximize.
