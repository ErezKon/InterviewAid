# 1590. Make Sum Divisible by P

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-sum-divisible-by-p](https://leetcode.com/problems/make-sum-divisible-by-p)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Phonepe, Samsung

---

## Problem Description
Given an array of positive integers `nums`, remove the **smallest** subarray (possibly **empty**) such that the **sum** of the remaining elements is divisible by `p`. It is **not** allowed to remove the whole array.

Return *the length of the smallest subarray that you need to remove, or* `-1` *if it's impossible*.

A **subarray** is defined as a contiguous block of elements in the array.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= p <= 10^9`

## Examples

```
Example 1:
  Input: nums = [3,1,4,2], p = 6
  Output: 1
  Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
```

```
Example 2:
  Input: nums = [6,3,5,2], p = 9
  Output: 2
  Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
```

```
Example 3:
  Input: nums = [1,2,3], p = 3
  Output: 0
  Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.
```

## Approach
Use **Prefix Sum Modulo** with a hash map to record the earliest index where each prefix remainder occurs. For each position, compute the needed remainder to achieve the target and update the minimal length.

```text
FUNCTION minSubarray(nums, p):
    total ← SUM(nums)
    remainder ← total MOD p
    IF remainder = 0: RETURN 0
    prefixMap ← MAP with (0 → -1)
    curMod ← 0
    minLen ← LENGTH(nums)
    FOR i FROM 0 TO LENGTH(nums)-1:
        curMod ← (curMod + nums[i]) MOD p
        target ← (curMod - remainder) MOD p
        IF target IN prefixMap:
            minLen ← MIN(minLen, i - prefixMap[target])
        prefixMap[curMod] ← i
    RETURN minLen IF minLen < LENGTH(nums) ELSE -1
```
The logic mirrors the classic *subarray sum equals k* pattern, but works with modular arithmetic.

## Walkthrough
For `[3,1,4,2]`, `p=6`:
1. Total = 10, remainder = 4.
2. Iterate:
   - i=0, curMod=3, target=(3-4) mod 6 = 5 → not in map.
   - i=1, curMod=4, target=0 → map[0] = -1 → length = 1-(-1)=2 (candidate).
   - i=2, curMod=2, target=4 → map[4] = 1 → length = 2-1=1 (best).
   - i=3, curMod=4, target=0 → length = 3-(-1)=4.
   Minimum length found is 1.

## Complexity Analysis
*Time*: **O(n)** – single pass through the array.
*Space*: **O(n)** – hash map stores at most one entry per index.

## Follow-Up Questions
1. How would you modify the algorithm to also return the actual subarray indices?
2. Can the solution be adapted for circular arrays where removal may wrap around?
3. What changes are needed if `p` can be zero?

## Key Takeaway
Transform the problem into finding a shortest subarray whose prefix sums differ by the required remainder; a hash map of prefix-mod values makes this O(n).
