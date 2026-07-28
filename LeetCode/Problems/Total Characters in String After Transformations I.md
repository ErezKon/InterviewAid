# 3335. Total Characters in String After Transformations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-i](https://leetcode.com/problems/total-characters-in-string-after-transformations-i)
**Companies:** Amazon, Google, Mathworks, Meta

---

## Problem Description
You are given a lowercase string `s` and an integer `t`. In one transformation, each character `c` in the string is replaced by the next character in the alphabet (`'a'→'b'`, …, `'z'→'a'`). After performing the transformation `t` times, return the total number of characters in the resulting string modulo `10^9+7`. (The length stays the same; the task is to compute the sum of character frequencies after `t` shifts.)

## Examples
| s | t | Output |
|---|---|--------|
| `"abc"` | `1` | `3` (string becomes `"bcd"`) |
| `"az"` | `2` | `2` (string becomes `"ba"`) |
| `"zzz"` | `3` | `3` (string cycles back to `"zzz"`) |

## Approach
Maintain a frequency array `count[26]` for characters in `s`. Each transformation shifts the frequencies one position to the right, with the count of `'z'` added to both `'a'` and `'b'` (since `'z'` becomes `'a'` and also contributes to `'b'` after the next shift). Perform this shift `t` times, applying modulo at each step.

```text
FUNCTION lengthAfterTransformations(s, t):
    SET MOD ← 1_000_000_007
    CREATE count[26] initialized 0
    FOR ch IN s:
        SET idx ← ASCII(ch) - ASCII('a')
        SET count[idx] ← count[idx] + 1
    FOR step FROM 1 TO t:
        CREATE newCount[26] initialized 0
        FOR i FROM 0 TO 24:
            SET newCount[i + 1] ← (newCount[i + 1] + count[i]) % MOD
        // handle 'z' wrapping to 'a' and also contributing to 'b'
        SET newCount[0] ← (newCount[0] + count[25]) % MOD
        SET newCount[1] ← (newCount[1] + count[25]) % MOD
        SET count ← newCount
    RETURN SUM(count) % MOD
```

## Walkthrough
For `s = "az"`, `t = 2`:
| Step | count before (a,z) | newCount after shift |
|------|--------------------|----------------------|
| 0 | [1,0,…,0,1] | – |
| 1 | shift: a←z, b←a → [1,1,0,…] |
| 2 | shift again: a←previous z (now at b), b←a → [1,1,0,…] |
Sum = 2.

## Complexity Analysis
*Time*: O(26·t) ≈ O(t) – each transformation processes 26 letters.
*Space*: O(26) – two fixed-size arrays.

## Follow‑Up Questions
1. How can you compute the result in O(1) using matrix exponentiation for very large `t`?
2. What changes if the alphabet size is not 26?
3. Can you extend the method to handle multiple independent strings simultaneously?

## Key Takeaway
Repeated character shifts can be simulated with a small fixed‑size frequency array, updating it `t` times with modular arithmetic.
