# 3424. Minimum Cost to Make Arrays Identical

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-arrays-identical](https://leetcode.com/problems/minimum-cost-to-make-arrays-identical)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort and Greedily Match — O(n log n)](#approach-sort-and-greedily-match--on-log-n)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two integer arrays `arr` and `brr` of length `n`, and an integer `k`. You can perform the following operations on `arr` *any* number of times:
- Split `arr` into *any* number of **contiguous** subarrays and rearrange these subarrays in *any order*. This operation has a fixed cost of `k`.
- Choose any element in `arr` and add or subtract a positive integer `x` to it. The cost of this operation is `x`.

Return the **minimum** total cost to make `arr` **equal** to `brr`.

**Constraints:**
- `1 ≤ arr.length == brr.length ≤ 10⁵`
- `0 ≤ k ≤ 2 * 10¹⁰`
- `-10⁵ ≤ arr[i] ≤ 10⁵`
- `-10⁵ ≤ brr[i] ≤ 10⁵`

---

## Examples

```
Example 1:
  Input: arr = [-7,9,5], brr = [7,-2,-5], k = 2
  Output: 13
  Explanation:
  - Split arr into two contiguous subarrays: [-7] and [9, 5] and rearrange them as [9, 5, -7], with a cost of 2.
  - Subtract 2 from element arr[0]. The array becomes [7, 5, -7]. The cost of this operation is 2.
  - Subtract 7 from element arr[1]. The array becomes [7, -2, -7]. The cost of this operation is 7.
  - Add 2 to element arr[2]. The array becomes [7, -2, -5]. The cost of this operation is 2.
  The total cost to make the arrays equal is 2 + 2 + 7 + 2 = 13.
```

```
Example 2:
  Input: arr = [2,1], brr = [2,1], k = 0
  Output: 0
  Explanation: Since the arrays are already equal, no operations are needed, and the total cost is 0.
```

---

## Key Insight

> When you rearrange `brr`, the minimum sum of absolute differences is achieved by **sorting both arrays** and matching them position by position. The decision is: pay the fixed cost `k` to unlock sorting, or keep the original order.

This is a classic result: the sum of `|a_i - b_i|` over paired elements is minimized when both sequences are sorted in the same order.

---

## Approach: Sort and Greedily Match — O(n log n) ✅

```
FUNCTION minCost(arr, brr, k):
    // Cost without rearranging
    costNoRearrange ← 0
    FOR i ← 0 TO n - 1 DO
        costNoRearrange ← costNoRearrange + |arr[i] - brr[i]|

    // Cost with rearranging (sort both, match greedily)
    sortedArr ← SORT(arr)
    sortedBrr ← SORT(brr)
    costRearrange ← k
    FOR i ← 0 TO n - 1 DO
        costRearrange ← costRearrange + |sortedArr[i] - sortedBrr[i]|

    RETURN MIN(costNoRearrange, costRearrange)
```

---

## Walkthrough

```
arr = [2, 1, 4], brr = [4, 2, 1], k = 5
```

**Without rearranging:**
| i | arr[i] | brr[i] | \|diff\| |
|---|--------|--------|----------|
| 0 | 2      | 4      | 2        |
| 1 | 1      | 2      | 1        |
| 2 | 4      | 1      | 3        |
| **Total** | | | **6** |

**With rearranging (sort both):**
- sortedArr = [1, 2, 4], sortedBrr = [1, 2, 4]
- Sum of diffs = 0
- costRearrange = 5 + 0 = **5**

**Result:** min(6, 5) = **5** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(n) — for sorted copies |

---

## Follow-Up Questions

1. **What if `k = 0`?** You always rearrange since there's no penalty — just sort both arrays and match.
2. **Can we do better than O(n log n)?** No, since sorting is required for optimal pairing (by the rearrangement inequality).
3. **What if elements can be negative?** The same approach works — sort both arrays in the same order.
4. **How does this relate to the Rearrangement Inequality?** The rearrangement inequality states that the sum of products (and by extension, minimizing sum of absolute differences) is optimized when sequences are similarly sorted.

---

## Key Takeaway

> When deciding whether to pay a fixed cost for optimal rearrangement, compare the greedy sorted-pairing cost (plus the fee) against the original ordering cost — the rearrangement inequality guarantees sorted matching minimizes absolute differences.
