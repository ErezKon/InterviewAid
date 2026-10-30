# 3452. Sum of Good Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-good-numbers](https://leetcode.com/problems/sum-of-good-numbers)
**Companies:** Bcg, Google

---

## Problem Description

> *Note: statement checked against the official text with verify.py. The Approach/Walkthrough below solve an invented digit problem. Correct idea: single pass — `nums[i]` is good iff (`i − k < 0` or `nums[i] > nums[i − k]`) and (`i + k ≥ n` or `nums[i] > nums[i + k]`); sum the good ones. O(n).*

Given an array of integers `nums` and an integer `k`, an element `nums[i]` is considered **good** if it is **strictly** greater than the elements at indices `i - k` and `i + k` (if those indices exist). If neither of these indices *exists*, `nums[i]` is still considered **good**.

Return the **sum** of all the **good** elements in the array.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`
- `1 <= k <= floor(nums.length / 2)`

## Examples

**Example 1:**
```
Input: nums = [1,3,2,1,5,4], k = 2
Output: 12
Explanation:
The good numbers are nums[1] = 3, nums[4] = 5, and nums[5] = 4 because they are strictly greater than the numbers at indices i - k and i + k.
```

**Example 2:**
```
Input: nums = [2,1], k = 1
Output: 2
Explanation:
The only good number is nums[0] = 2 because it is strictly greater than nums[1].
```

## Approach
Generate good numbers by performing a depth‑first search on digit positions, appending only allowed digits. Stop recursion when the constructed number exceeds `n`. Accumulate the sum of all generated numbers.

## Walkthrough
| Step | Current number | Action |
|------|----------------|--------|
| 0 | "" (empty) | start DFS |
| 1 | "1" | ≤ n, add to sum |
| 2 | "10" | ≤ n, add to sum |
| … | … | continue exploring allowed digits |

## Complexity Analysis
Time: O(g) where g is the count of good numbers ≤ n (much smaller than n). Each number is built once.
Space: O(d) recursion depth, where d is the number of digits of `n`.

## Follow-Up Questions
* How would you adapt the algorithm to count good numbers instead of summing them?
* Can the solution be extended to bases other than decimal?
* What if the set of allowed digits changes dynamically?

## Key Takeaway
Restricting digit choices enables a compact DFS that enumerates only valid numbers, avoiding a linear scan of the entire range.
