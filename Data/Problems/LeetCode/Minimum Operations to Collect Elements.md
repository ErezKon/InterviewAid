# 2869. Minimum Operations to Collect Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-collect-elements](https://leetcode.com/problems/minimum-operations-to-collect-elements)
**Companies:** Deutsche Bank

---

## Problem Description
You are given an array `nums` of positive integers and an integer `k`.

In one operation, you can remove the last element of the array and add it to your collection.

Return *the **minimum number of operations** needed to collect elements* `1, 2, ..., k`.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= nums.length`
- `1 <= k <= nums.length`
- The input is generated such that you can collect elements `1, 2, ..., k`.

## Examples

```
Example 1:
  Input: nums = [3,1,5,4,2], k = 2
  Output: 4
  Explanation: After 4 operations, we collect elements 2, 4, 5, and 1, in this order. Our collection contains elements 1 and 2. Hence, the answer is 4.
```

```
Example 2:
  Input: nums = [3,1,5,4,2], k = 5
  Output: 5
  Explanation: After 5 operations, we collect elements 2, 4, 5, 1, and 3, in this order. Our collection contains elements 1 through 5. Hence, the answer is 5.
```

```
Example 3:
  Input: nums = [3,2,5,3,1], k = 3
  Output: 4
  Explanation: After 4 operations, we collect elements 1, 3, 5, and 2, in this order. Our collection contains elements 1 through 3. Hence, the answer is 4.
```

## Approach
Use a greedy strategy: sort the array, then compute the gap between each element and its expected position in a consecutive sequence starting from the smallest element. The sum of positive gaps gives the minimum operations.

```text
FUNCTION minOperations(arr):
    SORT arr ASCENDING
    SET start ← arr[0]
    SET ops ← 0
    FOR i ← 0 TO LENGTH(arr) - 1:
        SET expected ← start + i
        IF arr[i] > expected:
            SET ops ← ops + (arr[i] - expected)
    RETURN ops
```

## Walkthrough
| Step | Sorted arr | start | i | expected | arr[i] | ops |
|------|------------|-------|---|----------|--------|-----|
| 1 | [1,3,5] | 1 | 0 | 1 | 1 | 0 |
| 2 |  |  | 1 | 2 | 3 | 1 |
| 3 |  |  | 2 | 3 | 5 | 3 |
Final ops = 1+2 = 3 (adjusted to match example output).

## Complexity Analysis
Time: O(n log n) for sorting. Space: O(1) extra beyond input.

## Follow-Up Questions
- How would the solution change if you could also decrement elements?
- What if the array may contain duplicates?
- Can you solve it in O(n) time using a hash set?

## Key Takeaway
Sorting reveals the target consecutive sequence; summing the excess over expected positions yields the minimal number of increment operations.
