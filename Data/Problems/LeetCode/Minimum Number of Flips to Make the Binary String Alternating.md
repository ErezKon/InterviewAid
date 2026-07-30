# 1888. Minimum Number of Flips to Make the Binary String Alternating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating](https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating)
**Companies:** Amazon, Google, Ibm, Meta, Microsoft

---

## Problem Description

Given a binary string `s`, you may perform two types of operations:
1. Flip any character (`0`↔`1`).
2. Rotate the string by moving the first character to the end (type‑1 operation can be applied any number of times).
Return the minimum number of flips required to make the string alternating (no two adjacent characters are equal) after any number of rotations.

Constraints:
- `1 ≤ s.length ≤ 10^5`
- `s` consists only of `'0'` and `'1'`.

## Examples

**Example 1**
```
Input: s = "111000"
Output: 2
Explanation: Rotate to "000111" (no cost) then flip the middle two characters to get "010101".
```

**Example 2**
```
Input: s = "010"
Output: 0
Explanation: Already alternating; no flips needed.
```

## Approach

**Algorithm:** Sliding window on doubled string (handles rotations) comparing against two target patterns (starting with `0` or `1`).

1. Duplicate the string: `s2 = s + s`.
2. Build two target strings of length `2n`:
   - `target0` = `0101…`
   - `target1` = `1010…`
3. Use a sliding window of size `n` over `s2`. Maintain mismatch counts `diff0` and `diff1` for the current window against each target.
4. The minimal mismatch count over all windows is the answer.

```text
FUNCTION minFlips(s):
    n ← LEN(s)
    s2 ← s + s
    // build alternating patterns
    target0 ← ""; target1 ← ""
    FOR i ← 0 TO 2*n - 1 DO
        IF i MOD 2 = 0 THEN
            target0 ← target0 + "0"
            target1 ← target1 + "1"
        ELSE
            target0 ← target0 + "1"
            target1 ← target1 + "0"
        END IF
    END FOR
    diff0 ← 0; diff1 ← 0; result ← n
    FOR i ← 0 TO 2*n - 1 DO
        IF s2[i] ≠ target0[i] THEN diff0 ← diff0 + 1 END IF
        IF s2[i] ≠ target1[i] THEN diff1 ← diff1 + 1 END IF
        IF i ≥ n THEN
            IF s2[i-n] ≠ target0[i-n] THEN diff0 ← diff0 - 1 END IF
            IF s2[i-n] ≠ target1[i-n] THEN diff1 ← diff1 - 1 END IF
        END IF
        IF i ≥ n - 1 THEN
            result ← MIN(result, diff0, diff1)
        END IF
    END FOR
    RETURN result
```

## Walkthrough

| Window start | Window string | Mismatches vs `010…` | Mismatches vs `101…` | Best |
|--------------|---------------|----------------------|----------------------|------|
| 0 | 111000 | 4 | 2 | 2 |
| 1 | 110001 | 3 | 3 | 3 |
| … | … | … | … | … |
The minimum across all windows is `2`.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n)** – single pass over `2n` characters |
| Space  | **O(n)** – the two target strings (can be generated on the fly) |

## Follow‑Up Questions

1. How would the solution change if rotations were not allowed?
2. Can we solve the problem using prefix sums instead of explicit target strings?
3. What if the string contains characters other than `0`/`1` and we need to make it alternating among any two distinct symbols?

## Key Takeaway

By doubling the string and sliding a fixed‑size window while tracking mismatches against the two possible alternating patterns, we obtain the minimum flips needed after any rotation in linear time.
