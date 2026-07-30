# 327. Count of Range Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-of-range-sum](https://leetcode.com/problems/count-of-range-sum)
**Companies:** Amazon, Google, Meta, Oracle

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

Given an integer array `nums` and two integers `lower` and `upper`, return the number of **range sums** that lie in `[lower, upper]` inclusive. A range sum `S(i, j)` is the sum of elements from index `i` to `j` (inclusive), where `i <= j`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `-10^5 <= lower <= upper <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `nums = [-2, 5, -1], lower = -2, upper = 2`
- **Output:** `3`
- **Explanation:** Range sums: S(0,0)=-2, S(0,1)=3, S(0,2)=2, S(1,1)=5, S(1,2)=4, S(2,2)=-1. In range [-2,2]: {-2, 2, -1} → 3.

**Example 2:**
- **Input:** `nums = [0], lower = 0, upper = 0`
- **Output:** `1`

---

## Key Insight

Range sum `S(i, j) = prefix[j+1] - prefix[i]`. We need to count pairs `(i, j)` with `i < j` where `lower ≤ prefix[j] - prefix[i] ≤ upper`. This is a **counting inversions variant** solvable with merge sort: during the merge step, both halves are sorted, so we can use two pointers to efficiently count valid pairs.

---

## Approach: Merge Sort on Prefix Sums — O(n log n) ✅

```
FUNCTION countRangeSum(nums, lower, upper):
    prefix = [0]
    FOR num IN nums:
        prefix.ADD(prefix[-1] + num)

    count = 0
    mergeSort(prefix, 0, len(prefix) - 1)
    RETURN count

FUNCTION mergeSort(arr, lo, hi):
    IF lo >= hi: RETURN
    mid = (lo + hi) / 2
    mergeSort(arr, lo, mid)
    mergeSort(arr, mid + 1, hi)

    // Count valid pairs
    j = k = mid + 1
    FOR i ← lo TO mid:
        WHILE j <= hi AND arr[j] - arr[i] < lower: j += 1
        WHILE k <= hi AND arr[k] - arr[i] <= upper: k += 1
        count += k - j

    // Standard merge
    merge(arr, lo, mid, hi)
```

**Why two pointers work in the merge step:**
- Both halves are already sorted after recursive calls.
- For each `prefix[i]` in the left half, find the window `[j, k)` in the right half where `lower ≤ prefix[r] - prefix[i] ≤ upper`.
- As `i` increases, both `j` and `k` can only move right → total work per merge = O(n).

---

## Walkthrough

**Input:** `nums = [-2, 5, -1], lower = -2, upper = 2`

Prefix sums: `[0, -2, 3, 2]`

```
mergeSort([0, -2, 3, 2], 0, 3)
├── mergeSort([0, -2], 0, 1)
│   ├── mergeSort([0], 0, 0) → base
│   ├── mergeSort([-2], 1, 1) → base
│   └── Count: i=0, prefix[0]=0, find j,k in [-2]
│        -2 ≤ -2-0 ≤ 2? -2 ≤ -2 ✅ → count += 1
│       Merge → [-2, 0]
├── mergeSort([3, 2], 2, 3)
│   └── Count: prefix[2]=3, find in [2]: 2-3=-1 ∈ [-2,2]? ✅ → count += 1
│       Merge → [2, 3]
└── Count across halves: left=[-2, 0], right=[2, 3]
     i=0: prefix=-2, find right values r where -2 ≤ r-(-2) ≤ 2 → 0 ≤ r ≤ 0 → none
     i=1: prefix=0, find right values r where -2 ≤ r-0 ≤ 2 → -2 ≤ r ≤ 2 → r=2 → count += 1

Total count = 1 + 1 + 1 = **3** ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — merge sort with linear counting per level |
| **Space** | O(n) — for the merge buffer |

---

## Follow-Up Questions

**Q1: Can this be solved with a BIT / segment tree?**
Yes. Coordinate-compress the prefix sums, then iterate right-to-left, querying the BIT for counts in `[prefix[i] + lower, prefix[i] + upper]`. Same O(n log n) time.

**Q2: How does this relate to LeetCode #493 (Reverse Pairs)?**
Both use merge sort to count pairs across halves. #493 counts `nums[i] > 2 * nums[j]`; this counts `lower ≤ diff ≤ upper`. The two-pointer pattern in the merge step is identical.

**Q3: What about a brute-force approach?**
O(n²) — compute all prefix differences. Too slow for n = 10^5.

**Q4: Why use prefix sums instead of working with the original array?**
Range sum `S(i,j)` becomes a single subtraction `prefix[j+1] - prefix[i]`, converting a 2D problem into pairwise comparisons on a 1D array.

---

## Key Takeaway

> **Merge sort is a powerful tool for counting pairs with order-dependent constraints. When you need to count pairs (i < j) satisfying a range condition on differences, merge sort lets you exploit sorted halves with two pointers for O(n log n) total work.**
