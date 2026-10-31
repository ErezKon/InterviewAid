# 3872. Longest Arithmetic Sequence After Changing At Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element](https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element)
**Companies:** Amazon

---

## 1. Problem Description

You are given an integer array `nums`.

A subarray is **arithmetic** if the difference between consecutive elements in the subarray is constant.

You can replace **at most one** element in `nums` with any **integer**. Then, you select an arithmetic subarray from `nums`.

Return an integer denoting the **maximum** length of the arithmetic subarray you can select.

**Constraints:**
- `4 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

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

**Example 1:**
```
Input: nums = [9,7,5,10,1]
Output: 5
Explanation: - Replace nums[3] = 10 with 3. The array becomes [9, 7, 5, 3, 1].
- Select the subarray [9, 7, 5, 3, 1], which is arithmetic because consecutive elements have a common difference of -2.
```

**Example 2:**
```
Input: nums = [1,2,6,7]
Output: 3
Explanation: - Replace nums[0] = 1 with -2. The array becomes [-2, 2, 6, 7].
- Select the subarray [-2, 2, 6, 7], which is arithmetic because consecutive elements have a common difference of 4.
```

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
- Can the solution be extended to non-contiguous arithmetic subsequences?
- What is the impact of allowing negative common differences?

---

## 3. Key Takeaway

> Extend standard arithmetic subarray DP with a "change budget" dimension. When the difference breaks, use the one allowed change to bridge the gap.
