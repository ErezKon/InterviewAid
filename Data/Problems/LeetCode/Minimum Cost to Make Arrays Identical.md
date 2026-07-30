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

Given two integer arrays `arr` and `brr` of length `n`, and an integer `k`, you can rearrange the elements of `brr` in any order. The cost of making the arrays identical is:

- If you choose **not** to rearrange `brr`: cost = sum of `|arr[i] - brr[i]|` for all `i`.
- If you choose to rearrange `brr`: cost = `k` + sum of `|arr[i] - brr[i]|` for the optimal rearrangement.

Return the **minimum cost** to make both arrays identical element-wise (after optionally rearranging `brr`).

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ arr[i], brr[i] ≤ 10⁵`
- `0 ≤ k ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input: arr = [2, 1, 4], brr = [4, 2, 1], k = 5
Output: 3
Explanation: Without rearranging: |2-4| + |1-2| + |4-1| = 2 + 1 + 3 = 6.
With rearranging brr to [2, 1, 4]: cost = 5 + 0 = 5.
With rearranging brr to [1, 2, 4]: cost = 5 + |2-1| + |1-2| + |4-4| = 5 + 1 + 1 + 0 = 7.
Best is no rearrangement cost = 6? Actually sort both and match: sorted arr=[1,2,4], sorted brr=[1,2,4] → cost = 5 + 0 = 5. But without rearranging cost = 6. Minimum = 5.
Wait — better: rearrange brr=[2,1,4] → cost = 5 + 0 = 5. Without: 6. Answer = 5.
```

**Example 2:**
```
Input: arr = [1, 1, 1], brr = [1, 1, 1], k = 0
Output: 0
Explanation: Arrays already identical, cost = 0.
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
