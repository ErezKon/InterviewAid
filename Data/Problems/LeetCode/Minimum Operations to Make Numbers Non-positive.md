# 2702. Minimum Operations to Make Numbers Non-positive

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive](https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive)
**Companies:** Citadel

---

## Problem Description
You are given a **0-indexed** integer array `nums` and two integers `x` and `y`. In one operation, you must choose an index `i` such that `0 <= i < nums.length` and perform the following:

- Decrement `nums[i]` by `x`.
- Decrement values by `y` at all indices except the `i`-th one.

Return *the minimum number of operations to make all the integers in* `nums` ***less than or equal to zero.***

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= y < x <= 10^9`

## Examples

```
Example 1:
  Input: nums = [3,4,1,7,6], x = 4, y = 2
  Output: 3
  Explanation: You will need three operations. One of the optimal sequence of operations is:
  Operation 1: Choose i = 3. Then, nums = [1,2,-1,3,4].
  Operation 2: Choose i = 3. Then, nums = [-1,0,-3,-1,2].
  Operation 3: Choose i = 4. Then, nums = [-3,-2,-5,-3,-2].
  Now, all the numbers in nums are non-positive. Therefore, we return 3.
```

```
Example 2:
  Input: nums = [1,2,1], x = 2, y = 1
  Output: 1
  Explanation: We can perform the operation once on i = 1. Then, nums becomes [0,0,0]. All the positive numbers are removed, and therefore, we return 1.
```

## Approach
The operation strictly reduces a positive number and never increases it, so the optimal strategy is to always halve the **largest** positive value first. This greedy choice minimizes future work because halving a larger number yields a bigger reduction in the remaining total. Implement the greedy process with a max-heap (priority queue):
1. Insert all positive numbers into a max-heap.
2. While the heap is not empty:
   - POP the maximum `x`.
   - Compute `y = ⌊x / 2⌋`.
   - Increment operation counter.
   - If `y > 0`, PUSH `y` back into the heap.
3. Return the counter.

### Pseudocode
```text
FUNCTION minOperations(nums):
    SET ops ← 0
    CREATE maxHeap
    FOR each v IN nums:
        IF v > 0:
            INSERT v INTO maxHeap
    WHILE maxHeap IS NOT EMPTY:
        SET x ← EXTRACT_MAX(maxHeap)
        SET y ← FLOOR(x / 2)
        INCREMENT ops
        IF y > 0:
            INSERT y INTO maxHeap
    RETURN ops
```

## Walkthrough
Consider `nums = [5, 3, 2]`.
| Step | Heap (max→min) | Extracted | New value | Ops |
|------|----------------|-----------|-----------|-----|
|1|[5,3,2]|5|2|1|
|2|[3,2,2]|3|1|2|
|3|[2,2,1]|2|1|3|
|4|[2,1,1]|2|1|4|
|5|[1,1,1]|1|0 (discard)|5|
Result = 5 operations.

## Complexity Analysis
- **Time:** O(k log k) where *k* is the number of positive elements plus the number of heap insertions (each operation adds at most one new element). In the worst case each positive number is halved O(log maxValue) times.
- **Space:** O(k) for the heap.

## Follow-Up Questions
1. How would the algorithm change if the operation were `x = x - 1` instead of halving?
2. What if each halving operation had a different cost depending on the current value?
3. Can the solution be adapted to work in a streaming setting where numbers arrive one-by-one?

## Key Takeaway
Greedily halving the current largest positive number using a max-heap yields the minimal number of operations to drive all values to non-positive.
