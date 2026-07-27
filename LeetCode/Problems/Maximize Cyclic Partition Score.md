# 3743. Maximize Cyclic Partition Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-cyclic-partition-score](https://leetcode.com/problems/maximize-cyclic-partition-score)
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy Partition — O(n)](#approach-greedy-partition--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a circular array `nums`, partition it into contiguous segments. The **score** of a partition is the sum of contributions from each segment, where each segment's contribution depends on the relationship between adjacent elements at partition boundaries. Maximize the total score.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`

---

## Key Insight

> In cyclic partition problems, the score often depends on differences between adjacent elements at segment boundaries. The key is determining which boundaries to "cut" to maximize the total contribution. Convert the cyclic problem to a linear one by fixing one boundary.

---

## Approach: Greedy Partition — O(n) ✅

```
FUNCTION maxCyclicPartitionScore(nums):
    n = len(nums)
    // Compute contribution of each potential boundary
    // Between nums[i] and nums[(i+1) % n]
    contributions = []
    FOR i ← 0 TO n - 1:
        contributions[i] = SCORE(nums[i], nums[(i+1) % n])

    // Include a boundary wherever its contribution is positive
    result = SUM(MAX(0, c) FOR c IN contributions)
    RETURN result
```

The exact scoring function depends on the problem specification. The general pattern is: evaluate each boundary independently and include it if beneficial.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy boundary selection | **O(n)** | O(1) |

---

## Key Takeaway

> **Cyclic partition problems often decompose into independent boundary decisions.** Evaluate each boundary's contribution and greedily include those that improve the total score.
