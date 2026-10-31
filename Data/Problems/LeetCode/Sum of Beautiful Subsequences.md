# 3671. Sum of Beautiful Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-beautiful-subsequences](https://leetcode.com/problems/sum-of-beautiful-subsequences)
**Companies:** Google, Infosys

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

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
Counting subsequences with GCD **exactly** `g` is hard directly, but counting those whose GCD is a **multiple** of `d` is easy: they are exactly the strictly increasing subsequences formed only from elements divisible by `d`.

1. **`g[d]` via Fenwick DP.** For each `d = 1..M` (`M = max(nums)`), walk the indices of elements divisible by `d` in array order. For an element `x`, the number of increasing subsequences ending at it is `cnt(x) = 1 + Σ cnt(y)` over earlier `y < x`. A Fenwick tree indexed by `x / d` (size `M / d`) answers the prefix sum in O(log). `g[d] = Σ cnt`.
2. **Inclusion–exclusion.** Let `f[d]` = number with GCD exactly `d`. Then `g[d] = Σ_{t ≥ 1} f[t·d]`, so processing `d` from `M` down to 1: `f[d] = g[d] − Σ_{t ≥ 2} f[t·d]`.
3. **Answer** = `Σ d · f[d]` mod 10⁹+7.

Each element is processed once per divisor (≤ ~100 divisors for values ≤ 7·10⁴), and the Fenwick trees have total size `Σ M/d = O(M log M)`.

```text
FUNCTION totalBeauty(nums):
    MOD ← 10^9 + 7; M ← MAX(nums)
    positions[v] ← sorted list of indices i with nums[i] == v
    FOR d ← 1 TO M:
        idx ← all indices from positions[m] for m = d, 2d, 3d, ... ≤ M, sorted
        IF idx empty: g[d] ← 0; CONTINUE
        bit ← Fenwick tree of size M / d, all zeros
        total ← 0
        FOR i IN idx:
            v ← nums[i] / d
            c ← (1 + bit.prefixSum(v - 1)) MOD MOD     // strictly smaller values
            total ← total + c
            bit.add(v, c)
        g[d] ← total MOD MOD
    ans ← 0
    FOR d ← M DOWNTO 1:
        f[d] ← g[d]
        FOR t ← 2d TO M STEP d: f[d] ← f[d] − f[t]
        f[d] ← f[d] MOD MOD
        ans ← (ans + d · f[d]) MOD MOD
    RETURN ans
```

## Walkthrough
Example 2: `nums = [4,6]`, `M = 6`.

| d | elements divisible by d | increasing subsequences | g[d] |
|---|-------------------------|-------------------------|------|
| 1 | 4, 6 | [4], [6], [4,6] | 3 |
| 2 | 4, 6 | [4], [6], [4,6] | 3 |
| 3 | 6 | [6] | 1 |
| 4 | 4 | [4] | 1 |
| 5 | - | - | 0 |
| 6 | 6 | [6] | 1 |

Inclusion–exclusion from large `d` down:

| d | f[d] = g[d] − Σ f[multiples] | d · f[d] |
|---|------------------------------|----------|
| 6 | 1 | 6 |
| 5 | 0 | 0 |
| 4 | 1 | 4 |
| 3 | 1 − f[6] = 0 | 0 |
| 2 | 3 − f[4] − f[6] = 1 | 2 |
| 1 | 3 − (1+0+1+0+1) = 0 | 0 |

Sum = 6 + 4 + 2 = `12`.

## Complexity Analysis
- **Time:** O(n · D · log M + M log M), where `D` ≤ ~100 is the maximum number of divisors of a value ≤ 7·10⁴ (each element is inserted into the Fenwick tree of each of its divisors), plus the harmonic-sum cost of allocating trees and the inclusion–exclusion loop.
- **Space:** O(M + n) for `g`, `f`, the position lists, and one Fenwick tree at a time.

## Follow-Up Questions
1. Using `g = Σ_{d | g} φ(d)`, show the answer also equals `Σ_d φ(d) · g[d]` — how does that remove the inclusion–exclusion pass?
2. How would you handle non-strictly increasing subsequences (allowing equal neighbours)?
3. What changes if the beauty used the LCM instead of the GCD?

## Key Takeaway
Turn "GCD exactly g" into "GCD a multiple of d" (just restrict to multiples of `d`), count those with a Fenwick-tree increasing-subsequence DP, then recover exact counts by inclusion–exclusion over multiples.
