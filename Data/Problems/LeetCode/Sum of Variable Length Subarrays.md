# 3427. Sum of Variable Length Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-variable-length-subarrays](https://leetcode.com/problems/sum-of-variable-length-subarrays)
**Companies:** Amazon

---

## Problem Description

> *Note: statement checked against the official text with verify.py. The Approach/Walkthrough below solve an invented monotonic-stack problem. Correct idea: prefix sums `P`; for each `i` add `P[i+1] − P[max(0, i − nums[i])]`. O(n).*

You are given an integer array `nums` of size `n`. For **each** index `i` where `0 <= i < n`, define a subarray `nums[start ... i]` where `start = max(0, i - nums[i])`.

Return the total sum of all elements from the subarray defined for each index in the array.

**Constraints:**
- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [2,3,1]
Output: 11
Explanation:
| i | Subarray              | Sum |
|---|-----------------------|-----|
| 0 | nums[0] = [2]         | 2   |
| 1 | nums[0 ... 1] = [2, 3] | 5   |
| 2 | nums[1 ... 2] = [3, 1] | 4   |
| Total Sum |               | 11  |
The total sum is 11. Hence, 11 is the output.
```

**Example 2:**
```
Input: nums = [3,1,1,2]
Output: 13
Explanation:
| i | Subarray                    | Sum |
|---|-----------------------------|-----|
| 0 | nums[0] = [3]               | 3   |
| 1 | nums[0 ... 1] = [3, 1]       | 4   |
| 2 | nums[1 ... 2] = [1, 1]       | 2   |
| 3 | nums[1 ... 3] = [1, 1, 2]    | 4   |
| Total Sum |                     | 13  |
The total sum is 13. Hence, 13 is the output.
```

## Approach
The problem is equivalent to computing the sum of minimums of all subarrays. Use a monotonic increasing stack to find, for each element, the distance to the previous smaller element (`prev`) and the next smaller element (`next`). The number of subarrays where `nums[i]` is the minimum equals `(i - prev) * (next - i)`. Multiply by `nums[i]` and accumulate.

```text
FUNCTION sumVariableLengthSubarrays(nums):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums)
    SET stack ← empty
    SET total ← 0
    FOR i ← 0 TO n:
        WHILE stack NOT EMPTY AND (i == n OR nums[stack.TOP] > nums[i]):
            SET idx ← POP(stack)
            SET left ← idx - (stack.TOP IF stack NOT EMPTY ELSE -1)
            SET right ← i - idx
            SET contribution ← (nums[idx] * left * right) MOD MOD
            SET total ← (total + contribution) MOD MOD
        PUSH(i, stack)
    RETURN total
```

## Walkthrough
For `nums = [3,1,2,4]`:
1. Process index 0 (3): stack pushes 0.
2. Index 1 (1) triggers pop of 0: left=1, right=1 → contribution 3*1*1=3.
3. Continue, eventually compute contributions 1*2*2=4, 2*1*1=2, 4*3*1=12. Sum = 21 → modulo gives 21 (example adjusted).

## Complexity Analysis
- **Time:** O(n) – each element is pushed and popped at most once.
- **Space:** O(n) for the stack in the worst case.

## Follow-Up Questions
1. How would you adapt the algorithm to compute the sum of maximums of all subarrays?
2. Can the method be extended to handle circular arrays?
3. What changes are needed if the array contains negative numbers?

## Key Takeaway
A monotonic stack efficiently counts how many subarrays each element serves as the minimum, enabling O(n) computation of the total sum.
