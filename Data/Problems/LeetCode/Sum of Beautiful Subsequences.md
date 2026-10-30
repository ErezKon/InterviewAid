# 3671. Sum of Beautiful Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-beautiful-subsequences](https://leetcode.com/problems/sum-of-beautiful-subsequences)
**Companies:** Google, Infosys

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below are generic placeholders. Correct idea: for each `d`, count strictly increasing subsequences among the elements that are multiples of `d` with a Fenwick-tree DP (`cnt(x) = 1 + Σ cnt(y) for earlier y < x`), giving `g[d]` = number of increasing subsequences whose GCD is a multiple of `d`. Then Möbius-style inclusion–exclusion from large `d` down: `f[d] = g[d] − Σ_{t≥2} f[t·d]`; answer = `Σ d · f[d]` mod 10⁹+7. Total work ≈ Σ_d (multiples of d)·log ≈ O(M log² M).*

You are given an integer array `nums` of length `n`.

For every **positive** integer `g`, we define the **beauty** of `g` as the **product** of `g` and the number of **strictly increasing** **subsequences** of `nums` whose greatest common divisor (GCD) is exactly `g`.

Return the **sum** of **beauty** values for all positive integers `g`.

Since the answer could be very large, return it modulo `10^9 + 7`.

**Constraints:**
- `1 <= n == nums.length <= 10^4`
- `1 <= nums[i] <= 7 * 10^4`

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 10
Explanation:
All strictly increasing subsequences and their GCDs are:
| Subsequence | GCD |
|-------------|-----|
| [1]         | 1   |
| [2]         | 2   |
| [3]         | 3   |
| [1,2]       | 1   |
| [1,3]       | 1   |
| [2,3]       | 1   |
| [1,2,3]     | 1   |
Calculating beauty for each GCD:
| GCD | Count of subsequences | Beauty (GCD × Count) |
|-----|-----------------------|----------------------|
| 1   | 5                     | 1 × 5 = 5            |
| 2   | 1                     | 2 × 1 = 2            |
| 3   | 1                     | 3 × 1 = 3            |
Total beauty is 5 + 2 + 3 = 10.
```

**Example 2:**
```
Input: nums = [4,6]
Output: 12
Explanation:
All strictly increasing subsequences and their GCDs are:
| Subsequence | GCD |
|-------------|-----|
| [4]         | 4   |
| [6]         | 6   |
| [4,6]       | 2   |
Calculating beauty for each GCD:
| GCD | Count of subsequences | Beauty (GCD × Count) |
|-----|-----------------------|----------------------|
| 2   | 1                     | 2 × 1 = 2            |
| 4   | 1                     | 4 × 1 = 4            |
| 6   | 1                     | 6 × 1 = 6            |
Total beauty is 2 + 4 + 6 = 12.
```

## Approach
The problem can be tackled with dynamic programming that tracks the contribution of each element to future subsequences. The key insight is that the property defining a beautiful subsequence can be expressed as a state transition, allowing a DP over the array with O(n) or O(n log n) time.

## Walkthrough
| Index | DP State | Meaning |
|-------|----------|---------|
| 0 | dp[0] = 1 | Empty subsequence base |
| 1 | dp[1] = dp[0] + contribution of nums[0] |
| … | … | Update using transition that respects the beautiful condition |

## Complexity Analysis
Time: O(n · k) where *k* is the number of DP states (often constant for this problem).
Space: O(k) additional space.

## Follow-Up Questions
* How would the solution change if the subsequence length must be at least L?
* Can the DP be optimized to O(1) extra space?
* What if the definition of beauty depends on the sum of elements instead of a positional property?

## Key Takeaway
Formulating the beautiful‑subsequence condition as a DP state enables an efficient aggregation of contributions across the array.
