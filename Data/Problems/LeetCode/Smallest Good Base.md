# 483. Smallest Good Base

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-good-base](https://leetcode.com/problems/smallest-good-base)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description
Given a string representation of a positive integer `n` (1 ≤ n < 2⁶⁴), find the smallest integer base `k` ( k ≥ 2 ) such that `n` can be written as a sequence of `m+1` digits all equal to `1` in base `k`. In other words, `n = 1 + k + k² + … + k^m` for some `m ≥ 1`. Return `k` as a string.

## Examples
| n (string) | Output | Explanation |
|------------|--------|-------------|
| `"13"` | `"3"` | `13 = 1 + 3 + 9` → base 3 representation `111`.
| `"4681"` | `"8"` | `4681 = 1 + 8 + 8² + 8³ + 8⁴` → `11111` in base 8.
| `"1000000000000000000"` | `"999999999999999999"` | For a power of two, the smallest base is `n‑1` giving representation `11`.

## Approach
**Algorithm:** Iterate possible lengths `m` (number of digits minus one) from the maximum down to 2, and for each `m` binary‑search the candidate base `k`.

1. Convert `n` to an integer `N`.
2. The maximum possible `m` is `⌊log₂ N⌋` because the smallest base is 2.
3. For each `m` from max down to 2:
   - Compute an initial guess `k = ⌊N^{1/m}⌋`.
   - Use binary search between `2` and `k+1` to find a `k` satisfying the geometric series formula ` (k^{m+1}‑1)/(k‑1) = N `.
   - If found, return `k` as string.
4. If no `k` works, the answer is `N‑1` (base `N‑1` yields `11`).

**Pseudocode:**
```text
FUNCTION smallestGoodBase(nStr):
    N ← CONVERT nStr TO INTEGER
    maxM ← FLOOR(log2(N))

    FOR m ← maxM DOWNTO 2:
        // lower and upper bounds for base k
        low ← 2
        high ← FLOOR(N ^ (1 / m)) + 1
        WHILE low ≤ high:
            mid ← (low + high) DIV 2
            // Compute sum = 1 + mid + mid^2 + ... + mid^m
            sum ← 1
            term ← 1
            FOR i ← 1 TO m:
                term ← term * mid
                sum ← sum + term
                IF sum > N: BREAK
            IF sum = N:
                RETURN STRING(mid)
            ELSE IF sum < N:
                low ← mid + 1
            ELSE:
                high ← mid - 1
    // No base found; fallback to N-1
    RETURN STRING(N - 1)
```

## Walkthrough
Take `n = "4681"` (N = 4681).
1. `maxM = FLOOR(log2 4681) = 12`.
2. Loop `m = 12 … 2`. When `m = 4`:
   - `high = FLOOR(4681^{1/4}) + 1 = 8`.
   - Binary search finds `mid = 8`.
   - Compute series: 1 + 8 + 64 + 512 + 4096 = 4681 → match.
   - Return `"8"`.

## Complexity Analysis
- **Time:** O(log N · log N) ≈ O(log² N). The outer loop runs at most `log₂ N` times, each binary search is `O(log N)` and series computation is `O(m)` ≤ `O(log N)`.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the algorithm if the digits could be any repeated digit, not just `1`?
2. Can the solution be extended to find the smallest base for which `n` has a representation consisting of only two distinct digits?
3. What is the impact on complexity if `n` is given as a binary string instead of decimal?

## Key Takeaway
By treating the representation `111…1` as a geometric series, the problem reduces to searching over possible series lengths and using binary search on the base, yielding an efficient O(log² N) solution.
