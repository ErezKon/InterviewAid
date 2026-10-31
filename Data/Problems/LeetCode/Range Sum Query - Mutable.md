# 307. Range Sum Query - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-mutable](https://leetcode.com/problems/range-sum-query-mutable)
**Companies:** Adobe, Bloomberg, Google, Microsoft
---

## Problem Description

Given an integer array `nums`, handle multiple queries of the following types:

- **Update** the value of an element in `nums`.
- Calculate the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `void update(int index, int val)` **Updates** the value of `nums[index]` to be `val`.
- `int sumRange(int left, int right)` Returns the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

**Constraints:**
- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls will be made to `update` and `sumRange`.

## Examples

**Example 1:**
```
Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output:
[null, 9, null, 8]
Explanation:
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
```

## Approach
Use a Binary Indexed Tree (Fenwick Tree) to store prefix sums. Updating an index adjusts the tree with the difference, and querying a range uses two prefix-sum queries.

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
- Update: O(log n)
- Query: O(log n)
- Space: O(n) for the tree and original array.

## Follow-Up Questions
1. How would you modify the structure to support range updates and range queries?
2. Can a Segment Tree provide the same functionality with additional operations?
3. What if the array is extremely large and stored on disk?

## Key Takeaway
A Fenwick Tree enables logarithmic-time point updates and prefix-sum queries, which combine to give efficient mutable range-sum queries.
