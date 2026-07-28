# 2926. Maximum Balanced Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-balanced-subsequence-sum](https://leetcode.com/problems/maximum-balanced-subsequence-sum)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a subsequence with maximum sum such that for every consecutive pair `(i, j)` in the subsequence: `nums[j] - nums[i] >= j - i` (i.e., `nums[j] - j >= nums[i] - i`). This is the "balanced" condition.

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## Examples

**Example 1:**
```
nums = [1,2,3,4]
```
**Output:** `10`
**Explanation:** The whole array satisfies the condition because `nums[i] - i` is non‑decreasing (0,0,0,0). Sum = 1+2+3+4.

**Example 2:**
```
nums = [5,1,2,3]
```
**Output:** `9`
**Explanation:** Choose subsequence `[5,2,3]`. Keys are `[5,1,0]` → after transformation `key = nums[i]-i` → `[5, -1, 0]`. The balanced condition holds for pairs (5,2) and (2,3). Sum = 5+2+3.

---

## Approach

> **Key Transformation** – Define `key[i] = nums[i] - i`. The balanced condition becomes `key[j] >= key[i]`. The problem reduces to a maximum‑weight non‑decreasing subsequence on `key` values.

We process elements left‑to‑right, maintaining a segment tree (or BIT) that stores the best subsequence sum for each compressed key. For each `i`:
1. Query the maximum `dp` among keys ≤ `key[i]`.
2. `dp[i] = nums[i] + max(0, queriedMax)`.
3. Update the structure at `key[i]` with `dp[i]`.
4. Track the global maximum.

```text
FUNCTION maxBalancedSubsequenceSum(nums):
    n ← LENGTH(nums)
    keys ← []
    FOR i ← 0 TO n-1:
        SET k ← nums[i] - i
        APPEND k TO keys
    // Coordinate compression
    sortedKeys ← SORTED(UNIQUE(keys))
    rank ← MAP each value in sortedKeys to its index
    segTree ← SegmentTree(LENGTH(sortedKeys))
    SET result ← -INFINITY
    FOR i ← 0 TO n-1:
        SET r ← rank[keys[i]]
        SET prevMax ← segTree.QUERY_MAX(0, r)   // best sum with key ≤ current
        SET dp ← nums[i] + MAX(0, prevMax)
        result ← MAX(result, dp)
        segTree.UPDATE(r, dp)   // keep the best dp for this key
    RETURN result
```

---

## Walkthrough

Consider `nums = [5,1,2,3]`.
| i | nums[i] | key = nums[i]-i | compressed rank | query max ≤ rank | dp = nums[i] + max(0, query) |
|---|---------|----------------|----------------|-------------------|--------------------------------|
|0|5|5|3|0|5|
|1|1|0|0|0|1|
|2|2|0|0|max(dp of rank0)=1|2+1=3|
|3|3|0|0|max(dp of rank0)=3|3+3=6|
Global max = 9 (subsequence 5,2,3).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Segment Tree / BIT | **O(n log n)** | O(n) (compression + tree) |

---

## Follow-Up Questions

- How would the solution change if the subsequence must be contiguous (subarray) instead of arbitrary?
- Can you achieve the same result using a balanced binary search tree instead of a segment tree?
- What if the constraint becomes `nums[j] - nums[i] >= c * (j - i)` for a constant `c`?

---

## Key Takeaway

> **Transform the balanced condition into a monotonic key comparison (`nums[i] - i`).** Then solve a maximum‑weight non‑decreasing subsequence using a segment tree or BIT for efficient range‑max queries.
