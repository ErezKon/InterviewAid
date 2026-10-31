# 1714. Sum Of Special Evenly-Spaced Elements In Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array](https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array)
**Companies:** Makemytrip

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a **0-indexed** integer array `nums` consisting of `n` non-negative integers.

You are also given an array `queries`, where `queries[i] = [x_i, y_i]`. The answer to the `i`th query is the sum of all `nums[j]` where `x_i <= j < n` and `(j - x_i)` is divisible by `y_i`.

Return *an array* `answer` *where* `answer.length == queries.length` *and* `answer[i]` *is the answer to the* `i`th *query **modulo*** `10^9 + 7`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `0 <= nums[i] <= 10^9`
- `1 <= queries.length <= 1.5 * 10^5`
- `0 <= x_i < n`
- `1 <= y_i <= 5 * 10^4`

## Examples

**Example 1:**
```
Input: nums = [0,1,2,3,4,5,6,7], queries = [[0,3],[5,1],[4,2]]
Output: [9,18,10]
Explanation: The answers of the queries are as follows:
1) The j indices that satisfy this query are 0, 3, and 6. nums[0] + nums[3] + nums[6] = 9
2) The j indices that satisfy this query are 5, 6, and 7. nums[5] + nums[6] + nums[7] = 18
3) The j indices that satisfy this query are 4 and 6. nums[4] + nums[6] = 10
```

**Example 2:**
```
Input: nums = [100,200,101,201,102,202,103,203], queries = [[0,7]]
Output: [303]
```

## Approach
Each query asks for `nums[x] + nums[x+y] + nums[x+2y] + …` (indices below `n`). Use **square-root decomposition** on the stride `y` with threshold `B = ⌊√n⌋`:
- **Large stride (`y > B`)**: the sequence has at most `n / y < √n` terms, so sum them directly.
- **Small stride (`y ≤ B`)**: build the stride-`y` suffix sums `suf[j] = nums[j] + suf[j + y]` (with `suf[j] = 0` for `j ≥ n`) once in O(n); then every query with this stride is answered as `suf[x]` in O(1).

To keep memory at O(n), group the small-stride queries by `y` and build one `suf` array per distinct small `y` (at most `B` of them). All sums are taken modulo 10^9 + 7.

```text
FUNCTION solve(nums, queries)
    MOD ← 1_000_000_007
    n ← length(nums)
    B ← max(1, FLOOR(SQRT(n)))
    answer ← array of length(queries) zeros
    groups ← map from stride y to list of query indices
    FOR k ← 0 TO length(queries)-1
        (x, y) ← queries[k]
        IF y ≤ B
            APPEND k TO groups[y]
        ELSE
            sum ← 0
            j ← x
            WHILE j < n                      // fewer than √n iterations
                sum ← (sum + nums[j]) MOD MOD
                j ← j + y
            answer[k] ← sum
    FOR EACH (y, list) IN groups
        suf ← array of size n + y, all 0
        FOR j ← n-1 DOWN TO 0
            suf[j] ← (nums[j] + suf[j + y]) MOD MOD
        FOR EACH k IN list
            answer[k] ← suf[queries[k].x]
    RETURN answer
```

## Walkthrough
Example 1: `nums = [0,1,2,3,4,5,6,7]`, `queries = [[0,3],[5,1],[4,2]]`, `n = 8`, `B = ⌊√8⌋ = 2`.

| Query | y vs B | Method | Computation | Answer |
|-------|--------|--------|-------------|--------|
| [0,3] | 3 > 2 | direct | nums[0] + nums[3] + nums[6] = 0 + 3 + 6 | 9 |
| [5,1] | 1 ≤ 2 | suf for y=1: [28,28,27,25,22,18,13,7] | suf[5] | 18 |
| [4,2] | 2 ≤ 2 | suf for y=2: [12,16,12,15,10,12,6,7] | suf[4] = 4 + suf[6] = 4 + 6 | 10 |

Result: **[9,18,10]**.

## Complexity Analysis
Time: `O((n + q)·√n)` — at most `√n` suffix arrays of O(n) each, plus O(√n) per large-stride query and O(1) per small-stride query (about 1.1·10^7 + 3.4·10^7 operations at the limits).
Space: `O(n + q)` — one suffix array at a time plus the query grouping and answers.

## Follow-Up Questions
1. How would you support point updates to `nums` between queries? (Large strides still sum directly; for small strides maintain a Fenwick tree per residue class, or rebuild lazily.)
2. How should the threshold `B` be tuned when `q` is much smaller or larger than `n`? (Balance `B·n` against `q·n/B`, which gives `B ≈ √q` and total `O(n·√q)`.)
3. What if queries also had an upper bound `r` (only indices `x ≤ j ≤ r`)? (Use `suf[x] − suf[first index > r in the same residue class]`.)

## Key Takeaway
Square-root decomposition on the step size splits queries into "few terms" (brute force) and "few distinct strides" (precomputed suffix sums), giving a balanced `O((n + q)√n)` solution where either strategy alone would be too slow.
