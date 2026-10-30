# 3644. Maximum K to Sort a Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-k-to-sort-a-permutation](https://leetcode.com/problems/maximum-k-to-sort-a-permutation)
**Companies:** Amazon

---

## Problem Description

You are given an integer array `nums` of length `n`, where `nums` is a **permutation** of the numbers in the range `[0..n - 1]`.

You may swap elements at indices `i` and `j` **only if** `nums[i] AND nums[j] == k`, where `AND` denotes the bitwise AND operation and `k` is a **non-negative** integer.

Return the **maximum** value of `k` such that the array can be sorted in **non-decreasing** order using any number of such swaps. If `nums` is already sorted, return 0.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= n - 1`
- `nums` is a permutation of integers from `0` to `n - 1`.

## Examples

**Example 1:**
```
Input: nums = [0,3,2,1]
Output: 1
Explanation: Choose k = 1. Swapping nums[1] = 3 and nums[3] = 1 is allowed since nums[1] AND nums[3] == 1, resulting in a sorted permutation: [0, 1, 2, 3].
```

**Example 2:**
```
Input: nums = [0,1,3,2]
Output: 2
Explanation: Choose k = 2. Swapping nums[2] = 3 and nums[3] = 2 is allowed since nums[2] AND nums[3] == 2, resulting in a sorted permutation: [0, 1, 2, 3].
```

**Example 3:**
```
Input: nums = [3,2,1,0]
Output: 0
Explanation: Only k = 0 allows sorting since no greater k allows the required swaps where nums[i] AND nums[j] == k.
```

## Approach
The minimum number of swaps required to sort a permutation equals `n - (number of cycles in the permutation)`. Compute the cycle decomposition, derive the minimum swaps, and the answer `K` is that minimum value because any larger `K` is also feasible.

```text
FUNCTION maxKToSort(permutation):
    SET n ← LENGTH(permutation)
    SET visited ← ARRAY of FALSE size n
    SET cycles ← 0
    FOR i ← 0 TO n-1:
        IF NOT visited[i]:
            SET j ← i
            WHILE NOT visited[j]:
                SET visited[j] ← TRUE
                SET j ← permutation[j] - 1  // convert value to index
            SET cycles ← cycles + 1
    SET minSwaps ← n - cycles
    RETURN minSwaps
```

## Walkthrough
Consider `[3,1,2]` (n=3):
1. Start at index 0 → 0→2→1→0 forms one cycle, `cycles=1`.
2. `minSwaps = 3 - 1 = 2` → return `2`.

## Complexity Analysis
- **Time:** `O(n)` – single pass to discover cycles.
- **Space:** `O(n)` – visited array.

## Follow‑Up Questions
1. How would the answer change if only adjacent swaps were allowed?
2. Can you extend the solution to return the actual sequence of swaps?
3. What is the minimum number of swaps needed to sort a list with duplicate values?

## Key Takeaway
The minimum swaps to sort a permutation equals the array size minus the number of permutation cycles; this directly yields the maximum feasible `K`.