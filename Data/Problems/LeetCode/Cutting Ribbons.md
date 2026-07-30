# 1891. Cutting Ribbons

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cutting-ribbons](https://leetcode.com/problems/cutting-ribbons)
**Companies:** Google, Meta

---

## Problem Description

Given ribbon lengths, find the maximum length `L` such that you can cut at least `k` ribbons of length `L`.

---

## Examples

**Example 1:**
```
Input: ribbons = [9,7,5], k = 3
Output: 5
Explanation: Cut ribbons into lengths [5,5,5] (from 9,7,5) achieving 3 pieces.
```

**Example 2:**
```
Input: ribbons = [7,5,9], k = 4
Output: 3
Explanation: Cut into [3,3,3,3] from the three ribbons.
```

---

## Approach

Binary search on the answer `L`. For each candidate length, count how many ribbons can be obtained: `sum(ribbon // L)`. Feasible if count ≥ k.

---

## Walkthrough

| Step | lo | hi | mid | count | Action |
|------|----|----|-----|-------|--------|
| 1 | 1 | 9 | 5 | 3 (9//5 + 7//5 + 5//5) | count ≥ k → result=5, lo=6 |
| 2 | 6 | 9 | 7 | 2 (9//7 + 7//7 + 5//7) | count < k → hi=6 |
| 3 | 6 | 6 | 6 | 2 (9//6 + 7//6 + 5//6) | count < k → hi=5 (loop ends) |
Result = 5.

---

## Complexity Analysis

- **Time:** O(n log(max_ribbon)) – binary search with O(n) feasibility check each iteration.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

- How would you adapt the solution if ribbons could be cut only at integer lengths that are divisors of the original lengths?
- Can you extend the approach to return the actual cut lengths rather than just the maximum feasible length?

---

## Key Takeaway

> **"Maximize the minimum" or "maximize a feasible value" → binary search on the answer. Check feasibility in O(n) by counting pieces.**