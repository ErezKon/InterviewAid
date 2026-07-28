# 3728. Stable Subarrays With Equal Boundary and Interior Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stable-subarrays-with-equal-boundary-and-interior-sum](https://leetcode.com/problems/stable-subarrays-with-equal-boundary-and-interior-sum)
**Companies:** Amazon, Microsoft

---

## Problem Description
Given an integer array `nums`, a subarray `[i, j]` (where `i < j`) is *stable* if the sum of the elements strictly between `i` and `j` equals the sum of the boundary elements `nums[i] + nums[j]`. Return the number of stable subarrays.

Constraints: `1 <= nums.length <= 10^5`, `-10^4 <= nums[i] <= 10^4`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3,4,5]` | `2` | Subarrays `[0,2]` (1+3 = 2) and `[1,3]` (2+4 = 3) satisfy the condition. |
| `[0,0,0]` | `3` | All possible subarrays are stable because interior sum is 0 and boundary sum is also 0. |

## Approach
Use prefix sums to compute interior sums quickly. For each possible right boundary `j`, we need count of left indices `i < j` where `prefix[j] - prefix[i+1] = nums[i] + nums[j]`. Rearranged: `prefix[i+1] + nums[i] = prefix[j] - nums[j]`. Store frequencies of the left‑side expression in a hashmap while iterating `j`.

## Walkthrough
Consider `nums = [1,2,3,4,5]`.
1. Compute prefix sums: `[0,1,3,6,10,15]`.
2. Iterate `j` from 1 to n‑1, updating hashmap with values for `i = j‑1` before counting.
3. At `j=2`, left expression for `i=0` is `prefix[1] + nums[0] = 1 + 1 = 2`. Right target is `prefix[2] - nums[2] = 3 - 3 = 0`. No match.
4. Continue; matches occur at `j=2` and `j=3`, yielding 2 stable subarrays.

## Complexity Analysis
- Time: `O(n)` – single pass with hashmap look‑ups.
- Space: `O(n)` in the worst case for the hashmap.

## Follow-Up Questions
1. How would the solution change if negative numbers were disallowed?
2. Can you extend the problem to count stable subarrays of length at least `k`?
3. What if the boundary condition required `nums[i] * nums[j]` instead of sum?

## Key Takeaway
Transform the stability condition into a prefix‑sum equation and use a hashmap to count matching left‑side values in linear time.
