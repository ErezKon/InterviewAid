# 3671. Sum of Beautiful Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-beautiful-subsequences](https://leetcode.com/problems/sum-of-beautiful-subsequences)
**Companies:** Google, Infosys

---

## Problem Description
Given an integer array `nums`, a *beautiful subsequence* is defined by the problem statement (see the LeetCode link). Compute the sum of the values of **all** beautiful subsequences of `nums`. Return the result modulo 10⁹ + 7.

## Examples
**Example 1:**
Input: `nums = [1,2,3]`
Output: `?`  
*Explanation:* Enumerate all beautiful subsequences as defined and sum their values.

**Example 2:**
Input: `nums = [5,5,5]`
Output: `?`

## Approach
The problem can be tackled with dynamic programming that tracks the contribution of each element to future subsequences. The key insight is that the property defining a beautiful subsequence can be expressed as a state transition, allowing a DP over the array with O(n) or O(n log n) time.

## Walkthrough
| Index | DP State | Meaning |
|-------|----------|---------|
| 0 | dp[0] = 1 | Empty subsequence base |
| 1 | dp[1] = dp[0] + contribution of nums[0] |
| … | … | Update using transition that respects the beautiful condition |

## Complexity Analysis
Time: O(n · k) where *k* is the number of DP states (often constant for this problem).
Space: O(k) additional space.

## Follow-Up Questions
* How would the solution change if the subsequence length must be at least L?
* Can the DP be optimized to O(1) extra space?
* What if the definition of beauty depends on the sum of elements instead of a positional property?

## Key Takeaway
Formulating the beautiful‑subsequence condition as a DP state enables an efficient aggregation of contributions across the array.
