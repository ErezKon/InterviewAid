# 1887. Reduction Operations to Make the Array Elements Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal](https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal)
**Companies:** Microsoft
---

## Problem Description
Given an integer array `nums`, your goal is to make all elements in `nums` equal. To complete one operation, follow these steps:

1. Find the **largest** value in `nums`. Let its index be `i` (**0-indexed**) and its value be `largest`. If there are multiple elements with the largest value, pick the smallest `i`.
2. Find the **next largest** value in `nums` **strictly smaller** than `largest`. Let its value be `nextLargest`.
3. Reduce `nums[i]` to `nextLargest`.

Return *the number of operations to make all elements in* `nums` *equal*.

**Constraints:**

- `1 <= nums.length <= 5 * 10⁴`
- `1 <= nums[i] <= 5 * 10⁴`

## Examples

```
Example 1:
  Input: nums = [5,1,3]
  Output: 3
  Explanation: It takes 3 operations to make all elements in nums equal:
    1. largest = 5 at index 0. nextLargest = 3. Reduce nums[0] to 3. nums = [3,1,3].
    2. largest = 3 at index 0. nextLargest = 1. Reduce nums[0] to 1. nums = [1,1,3].
    3. largest = 3 at index 2. nextLargest = 1. Reduce nums[2] to 1. nums = [1,1,1].
```

```
Example 2:
  Input: nums = [1,1,1]
  Output: 0
  Explanation: All elements in nums are already equal.
```

```
Example 3:
  Input: nums = [1,1,2,2,3]
  Output: 4
  Explanation: It takes 4 operations to make all elements in nums equal:
    1. largest = 3 at index 4. nextLargest = 2. Reduce nums[4] to 2. nums = [1,1,2,2,2].
    2. largest = 2 at index 2. nextLargest = 1. Reduce nums[2] to 1. nums = [1,1,1,2,2].
    3. largest = 2 at index 3. nextLargest = 1. Reduce nums[3] to 1. nums = [1,1,1,1,2].
    4. largest = 2 at index 4. nextLargest = 1. Reduce nums[4] to 1. nums = [1,1,1,1,1].
```

## Approach
Each operation lowers one element by exactly one "level" in the sorted list of distinct values. An element whose value is the `k`-th smallest distinct value (0-based `k`) must therefore be reduced exactly `k` times before it reaches the minimum. Sort the array ascending, keep a counter `level` that increases whenever the value changes, and add `level` for every element.

```text
FUNCTION reductionOperations(nums):
    SORT nums ASCENDING
    SET ops ← 0
    SET level ← 0                      // number of distinct values smaller than nums[i]
    FOR i ← 1 TO LENGTH(nums)-1:
        IF nums[i] != nums[i-1]:
            level ← level + 1
        ops ← ops + level
    RETURN ops
```

## Walkthrough
Example 3: `nums = [1,1,2,2,3]` (already sorted).

| i | nums[i] | changed? | level | ops |
|---|---------|----------|-------|-----|
| 1 | 1 | no | 0 | 0 |
| 2 | 2 | yes | 1 | 1 |
| 3 | 2 | no | 1 | 2 |
| 4 | 3 | yes | 2 | 4 |

Result **4**. Example 1: sorted `[1,3,5]` gives levels `0,1,2` → `0+1+2 = 3`.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting (or `O(n + V)` with counting sort, since values are at most `5 * 10^4`).
- **Space:** `O(1)` extra beyond the sort.

## Follow-Up Questions
1. How would you solve it in linear time using counting sort given the value bound?
2. What changes if each operation may reduce the largest element to any smaller existing value?
3. How would you compute the answer for every prefix of the array?

## Key Takeaway
Every element must step down through each distinct smaller value, so the answer is the sum, over all elements, of the number of distinct values below it -- computed in one pass over the sorted array.
