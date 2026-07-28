# 3872. Longest Arithmetic Sequence After Changing At Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element](https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element)
**Companies:** Amazon

---

## 1. Problem Description

Find the longest arithmetic (contiguous) subarray, where you may change at most one element to any value.

---

## 2. Approach: DP with One Change — O(n²) ✅

```
// For each common difference d:
//   Track length of arithmetic subarray ending at i with 0 or 1 changes
//   dp0[i] = length without changes
//   dp1[i] = length with at most 1 change
```

| Time | Space |
|------|-------|
| O(n²) or O(n) per diff | O(n) |

---

## 3. Examples

| nums | Output |
|------|--------|
| [1,3,5,7,9] | 5 (already arithmetic) |
| [1,2,4,7,10] | 5 (change the third element to 3) |
| [5,5,5,5] | 4 (any change keeps arithmetic) |

---

## 4. Walkthrough

Consider `nums = [1,2,4,7,10]`.

| i | nums[i] | dp0 (no change) | dp1 (one change) | Explanation |
|---|---------|----------------|------------------|-------------|
| 0 | 1 | 1 | 1 | Start of subarray |
| 1 | 2 | 2 | 2 | Difference 1 continues |
| 2 | 4 | 1 | 3 | Breaks diff 1; use one change to set 4→3, extending dp1 |
| 3 | 7 | 2 | 4 | Continue with changed value |
| 4 | 10| 3 | 5 | Final length 5 |

---

## 5. Complexity Analysis

- **Time:** O(n²) in the worst case when iterating over all possible common differences; can be reduced to O(n) per difference with sliding window.
- **Space:** O(n) for the DP arrays tracking lengths with and without a change.

---

## 6. Follow-Up Questions

- How would you modify the algorithm if you could change up to *k* elements?
- Can the solution be extended to non‑contiguous arithmetic subsequences?
- What is the impact of allowing negative common differences?

---

## 3. Key Takeaway

> Extend standard arithmetic subarray DP with a "change budget" dimension. When the difference breaks, use the one allowed change to bridge the gap.
