# 2963. Count the Number of Good Partitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-partitions](https://leetcode.com/problems/count-the-number-of-good-partitions)
**Companies:** Google

---

## Problem Description

A **good partition** splits the array into contiguous groups where no value appears in more than one group. Return the number of good partitions modulo `10^9 + 7`.

---

## Key Insight

For each value, its first and last occurrence define an interval. Merge overlapping intervals — the result is `m` non-overlapping segments. A partition is valid only at boundaries between segments, so there are `m - 1` potential split points, each independently chosen → `2^(m-1)` good partitions.

---

## Approach

```
FUNCTION numberOfGoodPartitions(nums):
    MOD = 10^9 + 7
    last = {}  // value → last index
    FOR i, v IN enumerate(nums): last[v] = i

    segments = 0
    maxRight = 0
    FOR i ← 0 TO n - 1 DO
        IF i > maxRight AND i > 0: segments += 1  // new segment starts
        maxRight = MAX(maxRight, last[nums[i]])

    // segments = number of merged intervals - 1 split points
    RETURN pow(2, segments, MOD)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) — last-occurrence map |

---

## Key Takeaway

> **Good partition = no value spans multiple groups. Find each value's range, merge overlapping ranges into segments, then answer is 2^(segments-1) since each boundary between segments is an independent binary choice.**
