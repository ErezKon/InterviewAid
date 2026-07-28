# 1590. Make Sum Divisible by P

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-sum-divisible-by-p](https://leetcode.com/problems/make-sum-divisible-by-p)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Phonepe, Samsung

---

## Problem Description
Given an integer array `nums` and an integer `p`, remove the smallest possible subarray (contiguous) such that the sum of the remaining elements is divisible by `p`. Return the length of that subarray, or `-1` if it is impossible.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,1,4,2]`, `p = 6` | `1` | Removing the subarray `[4]` leaves sum `6`, which is divisible by `6`. |
| `[6,3,5,2]`, `p = 9` | `2` | Removing `[5,2]` yields remaining sum `9`. |

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

## Follow‑Up Questions
1. How would you modify the algorithm to also return the actual subarray indices?
2. Can the solution be adapted for circular arrays where removal may wrap around?
3. What changes are needed if `p` can be zero?

## Key Takeaway
Transform the problem into finding a shortest subarray whose prefix sums differ by the required remainder; a hash map of prefix‑mod values makes this O(n).
