# 1427. Perform String Shifts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/perform-string-shifts](https://leetcode.com/problems/perform-string-shifts)
**Companies:** Goldman Sachs

---

## Problem Description
You are given a string `s` and an array of shift operations `shift`. Each operation is a pair `[direction, amount]` where `direction` is `0` for left shift and `1` for right shift, and `amount` indicates how many positions to shift. After applying all operations sequentially, return the final string.

Constraints: `1 ≤ s.length ≤ 100`; `1 ≤ shift.length ≤ 100`; `0 ≤ amount ≤ 10⁴`.

## Examples
| s | shift | Output | Explanation |
|---|-------|--------|-------------|
| "abc" | [[0,1],[1,2]] | "cab" | Left shift 1 → "bca"; right shift 2 → "cab" |
| "abcdefg" | [[1,1],[1,1],[0,2],[1,3]] | "efgabcd" | Net shift = right 1+1+3 - left 2 = right 3.

## Approach
Combine all shifts into a single net shift using modular arithmetic.

1. Initialise `net ← 0`.
2. For each `[dir, amt]` in `shift`:
   - IF `dir == 0` (left): `SET net ← net - amt`.
   - ELSE (right): `SET net ← net + amt`.
3. Compute `net ← net mod LENGTH(s)` to handle full rotations.
4. If `net` is negative, add `LENGTH(s)` to make it positive.
5. Perform the final shift: `result ← s[-net:] + s[:-net]` (right shift by `net`).

## Walkthrough
For `s = "abc"` and `shift = [[0,1],[1,2]]`:
| step | dir | amt | net |
|------|-----|-----|-----|
| init | – | – | 0 |
| 1 | left (0) | 1 | -1 |
| 2 | right (1) | 2 | 1 |
`net mod 3 = 1` → right shift by 1: `"abc"[-1:] + "abc"[:-1] = "c" + "ab" = "cab"`.

## Complexity Analysis
- Time: O(m + n) where `m = shift.length` and `n = s.length` (for the final string construction).
- Space: O(n) for the resulting string.

## Follow‑Up Questions
1. How would you modify the solution to support left‑right circular shifts on a mutable character array in‑place?
2. Can you handle very large `amount` values (e.g., up to 10⁹) without overflow?
3. What if the shift operations need to be applied in real‑time as a stream?

## Key Takeaway
Aggregating all shift operations into a single net rotation using modulo arithmetic yields an O(m + n) solution.
