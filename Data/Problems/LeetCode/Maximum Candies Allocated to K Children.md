# 2226. Maximum Candies Allocated to K Children

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-candies-allocated-to-k-children](https://leetcode.com/problems/maximum-candies-allocated-to-k-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach: Binary Search on Answer — O(n log max)](#approach-binary-search-on-answer--on-log-max-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given piles of `candies` and `k` children, split piles into sub‑piles of equal size and distribute to children. Maximize the number of candies each child gets.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ 10¹²`

---

## Examples

**Example 1:**
```
Input: candies = [3,1,4,1,5,9], k = 3
Output: 5
Explanation: Give each child 5 candies. We can split piles as: 3+1+1 = 5, 4+1 = 5, 5 = 5, remaining 9 is unused.
```

**Example 2:**
```
Input: candies = [2,2,2], k = 4
Output: 1
Explanation: Each child can receive at most 1 candy; total 3 candies < 4 children, so answer is 1.
```

---

## Approach: Binary Search on Answer — O(n log max) ✅

```text
FUNCTION maximumCandies(candies, k):
    lo ← 1
    hi ← MAX(candies)
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        children ← 0
        FOR each pile IN candies:
            children ← children + FLOOR(pile / mid)
        IF children ≥ k:
            lo ← mid + 1          // try larger amount
        ELSE:
            hi ← mid - 1          // too large, decrease
    RETURN hi
```

---

## Walkthrough

Consider **Example 1**: `candies = [3,1,4,1,5,9]`, `k = 3`.

| Step | lo | hi | mid | children (sum floor(pile/mid)) | Decision |
|------|----|----|-----|------------------------------|----------|
| 1 | 1 | 9 | 5 | 1+0+0+0+1+1 = 3 | children ≥ k → lo = 6 |
| 2 | 6 | 9 | 7 | 0+0+0+0+0+1 = 1 | children < k → hi = 6 |
| 3 | 6 | 6 | 6 | 0+0+0+0+0+1 = 1 | children < k → hi = 5 |

Loop ends, `hi = 5` is the maximum feasible candies per child.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(n log max(candies))** | O(1) |

---

## Follow-Up Questions

1. How would the algorithm change if each child must receive at least one candy from each pile?
2. Can we solve the problem without binary search using a priority queue?
3. What if the number of children `k` is also up to `10⁹` – does the approach still scale?

---

## Key Takeaway

> **"Maximize the minimum allocation" = binary search on the answer.** For each candidate, greedily check feasibility by summing `pile // candidate`.
