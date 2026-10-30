# 1427. Perform String Shifts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/perform-string-shifts](https://leetcode.com/problems/perform-string-shifts)
**Companies:** Goldman Sachs

---

## Problem Description
You are given a string `s` containing lowercase English letters, and a matrix `shift`, where `shift[i] = [direction_i, amount_i]`:

- `direction_i` can be `0` (for left shift) or `1` (for right shift).
- `amount_i` is the amount by which string `s` is to be shifted.
- A left shift by 1 means remove the first character of `s` and append it to the end.
- Similarly, a right shift by 1 means remove the last character of `s` and add it to the beginning.

Return the final string after all operations.

**Constraints:**

- `1 <= s.length <= 100`
- `s` only contains lower case English letters.
- `1 <= shift.length <= 100`
- `shift[i].length == 2`
- `direction_i` is either `0` or `1`.
- `0 <= amount_i <= 100`

## Examples

```
Example 1:
  Input: s = "abc", shift = [[0,1],[1,2]]
  Output: "cab"
  Explanation:
  [0,1] means shift to left by 1. "abc" -> "bca"
  [1,2] means shift to right by 2. "bca" -> "cab"
```

```
Example 2:
  Input: s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]
  Output: "efgabcd"
  Explanation:
  [1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
  [1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
  [0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
  [1,3] means shift to right by 3. "abcdefg" -> "efgabcd"
```

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
