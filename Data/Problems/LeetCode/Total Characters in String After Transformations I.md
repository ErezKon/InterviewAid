# 3335. Total Characters in String After Transformations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-i](https://leetcode.com/problems/total-characters-in-string-after-transformations-i)
**Companies:** Amazon, Google, Mathworks, Meta

---

## Problem Description

> *Note: the original description said `'z' → 'a'` (length unchanged); officially `'z'` becomes `"ab"`, so the length grows. The frequency-shift Approach below (count of `'z'` feeds both `'a'` and `'b'`) matches the official rule.*

You are given a string `s` and an integer `t`, representing the number of **transformations** to perform. In one **transformation**, every character in `s` is replaced according to the following rules:

- If the character is `'z'`, replace it with the string `"ab"`.
- Otherwise, replace it with the **next** character in the alphabet. For example, `'a'` is replaced with `'b'`, `'b'` is replaced with `'c'`, and so on.

Return the **length** of the resulting string after **exactly** `t` transformations.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.
- `1 <= t <= 10^5`

## Examples

**Example 1:**
```
Input: s = "abcyy", t = 2
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b', 'b' becomes 'c', 'c' becomes 'd', 'y' becomes 'z', 'y' becomes 'z'
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c', 'c' becomes 'd', 'd' becomes 'e', 'z' becomes "ab", 'z' becomes "ab"
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.
```

**Example 2:**
```
Input: s = "azbk", t = 1
Output: 5
Explanation:
First Transformation (t = 1):
'a' becomes 'b', 'z' becomes "ab", 'b' becomes 'c', 'k' becomes 'l'
String after the first transformation: "babcl"
Final Length of the string: The string is "babcl", which has 5 characters.
```

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
