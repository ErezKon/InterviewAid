# 2519. Count the Number of K-Big Indices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-k-big-indices](https://leetcode.com/problems/count-the-number-of-k-big-indices)
**Companies:** Amazon

---

## Problem Description

Index `i` is **k-big** if there are at least `k` elements before it that are strictly less than `nums[i]`, AND at least `k` elements after it that are strictly less than `nums[i]`. Count k-big indices.

---

## Key Insight

For each index, compute `leftSmaller[i]` = count of elements before `i` that are < `nums[i]`, and `rightSmaller[i]` = count of elements after `i` that are < `nums[i]`. Use a **BIT (Fenwick tree)** or sorted structure for efficient counting.

---

## Approach

```
FUNCTION kBigIndices(nums, k):
    n = LENGTH(nums)
    leftSmaller = [0] * n
    rightSmaller = [0] * n

    // Left pass: BIT counting elements < nums[i] seen so far
    bit = BIT(max_val)
    FOR i ← 0 TO n-1 DO
        leftSmaller[i] = bit.query(nums[i] - 1)
        bit.update(nums[i], 1)

    // Right pass: BIT from right
    bit = BIT(max_val)
    FOR i ← n-1 DOWN TO 0 DO
        rightSmaller[i] = bit.query(nums[i] - 1)
        bit.update(nums[i], 1)

    RETURN SUM(1 for i if leftSmaller[i] >= k AND rightSmaller[i] >= k)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log M) where M = max value |
| **Space** | O(M) for BIT |

---

## Key Takeaway

> **K-big indices require counting smaller elements on both sides. Two BIT passes (left-to-right and right-to-left) give O(n log M) solution.**
