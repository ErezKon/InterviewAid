# 1891. Cutting Ribbons

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cutting-ribbons](https://leetcode.com/problems/cutting-ribbons)
**Companies:** Google, Meta

---

## Problem Description

You are given an integer array `ribbons`, where `ribbons[i]` represents the length of the `i`-th ribbon, and an integer `k`. You may cut any of the ribbons into any number of segments of **positive integer** lengths, or perform no cuts at all.

- For example, if you have a ribbon of length `4`, you can:
  - Keep the ribbon of length `4`,
  - Cut it into one ribbon of length `3` and one ribbon of length `1`,
  - Cut it into two ribbons of length `2`,
  - Cut it into one ribbon of length `2` and two ribbons of length `1`, or
  - Cut it into four ribbons of length `1`.

Your task is to determine the **maximum** length of ribbon, `x`, that allows you to cut **at least** `k` ribbons, each of length `x`. You can discard any leftover ribbon from the cuts. If it is **impossible** to cut `k` ribbons of the same length, return 0.

**Constraints:**
- `1 <= ribbons.length <= 10^5`
- `1 <= ribbons[i] <= 10^5`
- `1 <= k <= 10^9`

---

## Examples

```
Example 1:
  Input: ribbons = [9,7,5], k = 3
  Output: 5
  Explanation:
  - Cut the first ribbon to two ribbons, one of length 5 and one of length 4.
  - Cut the second ribbon to two ribbons, one of length 5 and one of length 2.
  - Keep the third ribbon as it is.
  Now you have 3 ribbons of length 5.
```

```
Example 2:
  Input: ribbons = [7,5,9], k = 4
  Output: 4
  Explanation:
  - Cut the first ribbon to two ribbons, one of length 4 and one of length 3.
  - Cut the second ribbon to two ribbons, one of length 4 and one of length 1.
  - Cut the third ribbon to three ribbons, two of length 4 and one of length 1.
  Now you have 4 ribbons of length 4.
```

```
Example 3:
  Input: ribbons = [5,7,9], k = 22
  Output: 0
  Explanation: You cannot obtain k ribbons of the same positive integer length.
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