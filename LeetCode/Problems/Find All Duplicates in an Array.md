# 442. Find All Duplicates in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-duplicates-in-an-array](https://leetcode.com/problems/find-all-duplicates-in-an-array)
**Companies:** Amazon, Bloomberg, Clevertap, Google, Meta, Microsoft, Oracle, Pocket Gems, Tcs, Tiktok, Walmart Labs

---

## Problem Description
Given an integer array `nums` of length `n` where each element is in the range `[1, n]`, return all the elements that appear **exactly twice**. The output can be in any order.

## Examples
```text
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Explanation: Numbers 2 and 3 appear twice.

Input: nums = [1,1,2]
Output: [1]
```

## Approach
Since the values are bounded by the array size, we can use the array itself as a hash map by marking visited indices:
1. Iterate over each number `num`.
2. Compute `idx = abs(num) - 1`.
3. If `nums[idx]` is negative, `num` has been seen before → add `abs(num)` to result.
4. Otherwise, negate `nums[idx]` to mark it as visited.
The array is restored if needed by taking absolute values afterwards.

## Pseudocode
```text
FUNCTION findDuplicates(nums):
    SET result ← []
    FOR each num IN nums:
        SET idx ← ABS(num) - 1
        IF nums[idx] < 0:
            APPEND ABS(num) TO result
        ELSE:
            SET nums[idx] ← -nums[idx]
    RETURN result
```

## Walkthrough
| Step | num | idx | nums after marking | result |
|------|-----|-----|--------------------|--------|
| 1 | 4 | 3 | [4,3,2,-7,8,2,3,1] | [] |
| 2 | 3 | 2 | [4,3,-2,-7,8,2,3,1] | [] |
| 3 | 2 | 1 | [4,-3,-2,-7,8,2,3,1] | [] |
| 4 | 7 | 6 | [4,-3,-2,-7,8,2,-3,1] | [] |
| 5 | 8 | 7 | [4,-3,-2,-7,8,2,-3,-1] | [] |
| 6 | 2 | 1 | nums[1] already negative → result += 2 |
| 7 | 3 | 2 | nums[2] already negative → result += 3 |
| 8 | 1 | 0 | [ -4,-3,-2,-7,8,2,-3,-1] | [2,3]
```

## Complexity Analysis
- **Time:** O(n) – single pass.
- **Space:** O(1) extra space (output list excluded).

## Follow‑Up Questions
- How would you modify the algorithm to return numbers that appear more than twice?
- Can you solve the problem without modifying the input array?
- What changes are needed if the numbers are not limited to `[1, n]`?

## Key Takeaway
By treating indices as markers and using sign flipping, we achieve constant‑extra‑space duplicate detection in linear time.
