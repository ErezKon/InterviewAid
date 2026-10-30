# 2134. Minimum Swaps to Group All 1's Together II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii)
**Companies:** Adobe, Amazon, Arcesium, Bloomberg, Bytedance, Google, Ibm, Josh Technology, Microsoft, Tiktok

---

## Problem Description

A **swap** is defined as taking two **distinct** positions in an array and swapping the values in them.

A **circular** array is defined as an array where we consider the **first** element and the **last** element to be **adjacent**.

Given a **binary** **circular** array `nums`, return *the minimum number of swaps required to group all *`1`*'s present in the array together at **any location***.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: Here are a few of the ways to group all the 1's together:
[0,0,1,1,1,0,0] using 1 swap.
[0,1,1,1,0,0,0] using 1 swap.
[1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
There is no way to group all 1's together with 0 swaps.
Thus, the minimum number of swaps required is 1.
```

**Example 2:**
```
Input: nums = [0,1,1,1,0,0,1,1,0]
Output: 2
Explanation: Here are a few of the ways to group all the 1's together:
[1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
[1,1,1,1,1,0,0,0,0] using 2 swaps.
There is no way to group all 1's together with 0 or 1 swaps.
Thus, the minimum number of swaps required is 2.
```

**Example 3:**
```
Input: nums = [1,1,0,0,1]
Output: 0
Explanation: All the 1's are already grouped together due to the circular property of the array.
Thus, the minimum number of swaps required is 0.
```

## Approach
**Algorithm:** Fixed‑size sliding window on a circular array.
1. Count total number of `1`s → window size `k`.
2. Slide a window of size `k` around the circle, counting `0`s inside.
3. The minimum `0`s encountered equals the minimum swaps.

### Pseudocode
```text
FUNCTION minSwaps(nums):
    SET ones ← SUM(nums)
    IF ones <= 1: RETURN 0
    SET n ← LENGTH(nums)
    // Count zeros in first window
    SET zeros ← 0
    FOR i ← 0 TO ones - 1:
        IF nums[i] == 0: zeros ← zeros + 1
    SET minZeros ← zeros
    FOR i ← 1 TO n - 1:
        // remove left element
        IF nums[i - 1] == 0: zeros ← zeros - 1
        // add right element (circular)
        IF nums[(i + ones - 1) % n] == 0: zeros ← zeros + 1
        SET minZeros ← MIN(minZeros, zeros)
    RETURN minZeros
```

## Walkthrough
Consider `nums = [1,0,1,0,1]` (n=5, ones=3).
| Step | Window indices | Zeros in window | minZeros |
|------|----------------|----------------|----------|
| Init | 0‑2            | 1              | 1 |
| i=1  | 1‑3            | 2              | 1 |
| i=2  | 2‑4            | 1              | 1 |
| i=3  | 3‑0 (wrap)     | 2              | 1 |
| i=4  | 4‑1 (wrap)     | 1              | 1 |
Result = 1 swap.

## Complexity Analysis
- Time: O(n) – one pass around the array.
- Space: O(1) – only counters are used.

## Follow‑Up Questions
1. How would the solution change if the array were not circular?
2. Can you extend the approach to group `k` specific values together?
3. What if swaps are only allowed between adjacent elements?

## Key Takeaway
The minimum swaps equal the fewest zeros inside any window of size equal to the total number of ones; a circular sliding window finds this in linear time.