# 307. Range Sum Query - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-mutable](https://leetcode.com/problems/range-sum-query-mutable)
**Companies:** Adobe, Bloomberg, Google, Microsoft
---

## Problem Description
Design a data structure that supports updating the value of an element in an integer array and querying the sum of elements within a given range `[left, right]`. Both operations should be faster than O(n).

## Examples
- Initialize with `nums = [1,3,5]`. `sumRange(0,2)` returns `9`.
- After `update(1,2)`, the array becomes `[1,2,5]`. `sumRange(0,2)` now returns `8`.

## Approach
Use a Binary Indexed Tree (Fenwick Tree) to store prefix sums. Updating an index adjusts the tree with the difference, and querying a range uses two prefix‑sum queries.

```text
CLASS NumArray:
    CONSTRUCTOR(nums):
        SET n ← LENGTH(nums)
        SET tree ← ARRAY of zeros size n+1
        SET original ← COPY(nums)
        FOR i ← 0 TO n-1:
            CALL update(i, nums[i])
        END FOR
    FUNCTION update(index, val):
        SET diff ← val - original[index]
        SET original[index] ← val
        SET i ← index + 1
        WHILE i ≤ n:
            SET tree[i] ← tree[i] + diff
            SET i ← i + (i AND -i)
        END WHILE
    FUNCTION prefixSum(i):
        SET sum ← 0
        SET i ← i + 1
        WHILE i > 0:
            SET sum ← sum + tree[i]
            SET i ← i - (i AND -i)
        END WHILE
        RETURN sum
    FUNCTION sumRange(left, right):
        RETURN prefixSum(right) - prefixSum(left - 1)
END CLASS
```

## Walkthrough
| Step | Action | Tree state (first 5 indices) |
|------|--------|------------------------------|
|Init|build from `[1,3,5]`|`[0,1,4,5,6,5]`|
|update(1,2)|diff = -1, update indices 2,4,8|tree becomes `[0,1,3,5,5,5]`|
|sumRange(0,2)|prefixSum(2)=8, prefixSum(-1)=0 → 8|

## Complexity Analysis
- Update: O(log n)
- Query: O(log n)
- Space: O(n) for the tree and original array.

## Follow‑Up Questions
1. How would you modify the structure to support range updates and range queries?
2. Can a Segment Tree provide the same functionality with additional operations?
3. What if the array is extremely large and stored on disk?

## Key Takeaway
A Fenwick Tree enables logarithmic‑time point updates and prefix‑sum queries, which combine to give efficient mutable range‑sum queries.
