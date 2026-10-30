# 3190. Find Minimum Operations to Make All Elements Divisible by Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three](https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three)
**Companies:** Amazon, Bloomberg, Google, Tcs

---

## Problem Description
You are given an integer array `nums`. In one operation, you can add or subtract 1 from **any** element of `nums`.

Return the **minimum** number of operations to make all elements of `nums` divisible by 3.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

## Examples
```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 3
  Explanation: All array elements can be made divisible by 3 using 3 operations:
  - Subtract 1 from 1.
  - Add 1 to 2.
  - Subtract 1 from 4.
```

```
Example 2:
  Input: nums = [3,6,9]
  Output: 0
```

## Approach
For each number, the optimal adjustment is the smaller of moving up to the next multiple of three or down to the previous multiple. The cost for a single element `x` is `min(x % 3, 3 - (x % 3))`. Summing this over all elements yields the answer. This is a straightforward **greedy** calculation.

### Pseudocode
```text
FUNCTION minimumOperations(nums):
    total ← 0
    FOR each x IN nums:
        remainder ← x MOD 3
        cost ← MIN(remainder, 3 - remainder)
        total ← total + cost
    RETURN total
```

## Walkthrough
For `nums = [2,5,6]`:
| x | x % 3 | min(x%3, 3-x%3) | cumulative total |
|---|-------|------------------|------------------|
|2|2|1|1|
|5|2|1|2|
|6|0|0|2|
Result = 2 operations.

## Complexity Analysis
*Time*: O(n) – one pass through the array.
*Space*: O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would the solution change if the target divisor were a different integer `k`?
2. Can we extend the approach to also return the final adjusted array?
3. What if each increment/decrement operation has a different cost per element?

## Key Takeaway
The minimal number of adjustments equals the sum of the smallest distance of each element to the nearest multiple of three.
