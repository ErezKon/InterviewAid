# 2926. Maximum Balanced Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-balanced-subsequence-sum](https://leetcode.com/problems/maximum-balanced-subsequence-sum)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Segment Tree / BIT on Transformed Key — O(n log n)](#approach-segment-tree--bit-on-transformed-key--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a subsequence with maximum sum such that for every consecutive pair `(i, j)` in the subsequence: `nums[j] - nums[i] >= j - i` (i.e., `nums[j] - j >= nums[i] - i`). This is the "balanced" condition.

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## Key Insight

> Define `key[i] = nums[i] - i`. The balanced condition becomes `key[j] >= key[i]`. This transforms the problem into: **find the maximum weight increasing subsequence on key values**, where weight = nums[i]. Use a segment tree or BIT for range max queries.

---

## Approach: Segment Tree / BIT on Transformed Key — O(n log n) ✅

```
FUNCTION maxBalancedSubsequenceSum(nums):
    n = len(nums)
    keys = [nums[i] - i FOR i IN 0..n-1]
    // Coordinate compress keys
    sortedKeys = SORTED(SET(keys))
    rank = {v: i for i, v in enumerate(sortedKeys)}

    // Segment tree for range max query
    segTree = SegmentTree(len(sortedKeys))

    result = -infinity
    FOR i ← 0 TO n - 1:
        r = rank[keys[i]]
        // Best previous dp with key <= keys[i]
        prevMax = segTree.queryMax(0, r)
        dp = nums[i] + MAX(0, prevMax)
        result = MAX(result, dp)
        segTree.update(r, dp)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Segment Tree | **O(n log n)** | O(n) |

---

## Key Takeaway

> **Transform the balanced condition into a key comparison (nums[i] - i), then solve as "max weight non-decreasing subsequence" using a segment tree.** The key transformation is the critical insight.
