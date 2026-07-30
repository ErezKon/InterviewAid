# 2134. Minimum Swaps to Group All 1's Together II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii)
**Companies:** Adobe, Amazon, Arcesium, Bloomberg, Bytedance, Google, Ibm, Josh Technology, Microsoft, Tiktok

---

## Problem Description
Given a circular binary array `nums`, you may rotate the array any number of times. In one swap you can exchange any `0` with any `1`. Return the minimum number of swaps required to group all `1`s together in the circular array.

## Examples
| nums | Minimum Swaps |
|------|---------------|
| [1,0,1,0,1] | 1 |
| [0,0,0,1,0] | 0 |

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