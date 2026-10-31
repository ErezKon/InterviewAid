# 3542. Minimum Operations to Convert All Elements to Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero](https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
You are given an array `nums` of size `n`, consisting of **non-negative** integers. Your task is to apply some (possibly zero) operations on the array so that **all** elements become 0.

In one operation, you can select a subarray `[i, j]` (where `0 <= i <= j < n`) and set all occurrences of the **minimum** **non-negative** integer in that subarray to 0.

Return the **minimum** number of operations required to make all elements in the array 0.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Examples

```
Example 1:
  Input: nums = [0,2]
  Output: 1
  Explanation:
  - Select the subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0].
  - Thus, the minimum number of operations required is 1.
```

```
Example 2:
  Input: nums = [3,1,2,1]
  Output: 3
  Explanation:
  - Select subarray [1,3] (which is [1,2,1]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [3,0,2,0].
  - Select subarray [2,2] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [3,0,0,0].
  - Select subarray [0,0] (which is [3]), where the minimum non-negative integer is 3. Setting all occurrences of 3 to 0 results in [0,0,0,0].
  - Thus, the minimum number of operations required is 3.
```

```
Example 3:
  Input: nums = [1,2,1,2,1,2]
  Output: 4
  Explanation:
  - Select subarray [0,5] (which is [1,2,1,2,1,2]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [0,2,0,2,0,2].
  - Select subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,2,0,2].
  - Select subarray [3,3] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,2].
  - Select subarray [5,5] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,0].
  - Thus, the minimum number of operations required is 4.
```

## Approach
Use a monotonic stack to count distinct non-zero “levels”. Iterate through the array, maintaining a stack of increasing heights. When the current value is lower than the stack top, pop until the stack top ≤ current. If the current value is greater than the stack top, push it and increment operation count.

```text
FUNCTION minOperations(nums):
    // stack holds increasing heights, sentinel 0 at bottom
    SET stack ← [0]
    SET ops ← 0
    FOR num IN nums:
        WHILE stack[-1] > num:
            POP stack
        IF num > stack[-1]:
            PUSH num ONTO stack
            SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Index | num | Stack before | Action | Stack after | ops |
|-------|-----|--------------|--------|-------------|-----|
| 0 | 2 | [0] | 2 > 0 → push | [0,2] | 1 |
| 1 | 3 | [0,2] | 3 > 2 → push | [0,2,3] | 2 |
| 2 | 2 | [0,2,3] | pop 3 (3>2) then 2 == top → no push | [0,2] | 2 |
Final ops = 2 (matches minimal operations).

## Complexity Analysis
Time: O(n) – each element is pushed and popped at most once.
Space: O(n) worst-case for the stack, O(1) extra beyond input.

## Follow-Up Questions
- How would the solution change if you could only subtract from prefixes?
- What if negative numbers were allowed?
- Can you extend the approach to compute the sequence of operations?

## Key Takeaway
A monotonic stack efficiently captures the distinct height levels that dictate the number of required decrement operations.
