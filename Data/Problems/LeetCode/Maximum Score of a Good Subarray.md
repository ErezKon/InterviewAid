# 1793. Maximum Score of a Good Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-a-good-subarray](https://leetcode.com/problems/maximum-score-of-a-good-subarray)
**Companies:** Google

---

## Problem Description

You are given an array of integers `nums` **(0-indexed)** and an integer `k`.

The **score** of a subarray `(i, j)` is defined as `min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1)`. A **good** subarray is a subarray where `i <= k <= j`.

Return *the maximum possible **score** of a **good** subarray.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 2 * 10^4`
- `0 <= k < nums.length`

## Examples

**Example 1:**
```
Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
Explanation: The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15.
```

**Example 2:**
```
Input: nums = [5,5,4,5,4,1,1,1], k = 0
Output: 20
Explanation: The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.
```

## Approach
Use a monotonic increasing stack to treat each element as the minimum of a candidate subarray. For each index `i`, find the nearest smaller element on the left (`left`) and right (`right`). The subarray where `nums[i]` is the minimum spans `(left+1)` to `(right-1)`. Compute its sum using prefix sums and calculate the score.

```text
FUNCTION maxScoreGoodSubarray(nums):
    SET n ← LENGTH(nums)
    // prefix sums for O(1) range sum
    SET prefix[0] ← 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + nums[i]
    CREATE empty STACK
    SET maxScore ← 0
    FOR i ← 0 TO n:   // include sentinel at end with value 0
        SET curVal ← IF i = n THEN 0 ELSE nums[i]
        WHILE STACK NOT EMPTY AND curVal < nums[STACK.TOP()]:
            SET idx ← POP STACK
            SET left ← IF STACK EMPTY THEN -1 ELSE STACK.TOP()
            SET right ← i
            SET subSum ← prefix[right] - prefix[left+1]
            SET score ← nums[idx] * subSum
            SET maxScore ← MAX(maxScore, score)
        PUSH i ONTO STACK
    RETURN maxScore
```
The sentinel ensures all elements are processed.

## Walkthrough
For `nums = [1,2,3,2]`:
- Prefix sums: [0,1,3,6,8]
- Stack processing yields candidate subarrays where each element is the minimum, ultimately giving max score 14.

## Complexity Analysis
- **Time:** O(n) – each index is pushed and popped at most once.
- **Space:** O(n) for the stack and prefix array.

## Follow-Up Questions
1. How would you adapt the algorithm if the score were defined as `max(nums[l..r]) * sum(nums[l..r])`?
2. Can the solution be extended to two-dimensional grids where the score uses the minimum element of a sub-matrix?
3. What if the array size is up to 10⁶ – would the same approach still be optimal?

## Key Takeaway
A monotonic stack combined with prefix sums efficiently enumerates subarrays where each element serves as the minimum, yielding the maximum `min * sum` score.
