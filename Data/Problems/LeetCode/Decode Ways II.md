# 639. Decode Ways II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/decode-ways-ii](https://leetcode.com/problems/decode-ways-ii)
**Companies:** Meta, Phonepe

---

## Problem Description

A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:

```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `"11106"` can be mapped into:

- `"AAJF"` with the grouping `(1 1 10 6)`
- `"KJF"` with the grouping `(11 10 6)`

Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped into `'F'` since `"6"` is different from `"06"`.

**In addition** to the mapping above, an encoded message may contain the `'*'` character, which can represent any digit from `'1'` to `'9'` (`'0'` is excluded). For example, the encoded message `"1*"` may represent any of the encoded messages `"11"`, `"12"`, `"13"`, `"14"`, `"15"`, `"16"`, `"17"`, `"18"`, or `"19"`. Decoding `"1*"` is equivalent to decoding **any** of the encoded messages it can represent.

Given a string `s` consisting of digits and `'*'` characters, return *the **number** of ways to **decode** it*.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**

- `1 <= s.length <= 10^5`
- `s[i]` is a digit or `'*'`.

---

## Key Insight

Same DP as Decode Ways but with multiplied possibilities. `*` as a single digit = 9 options. For two-digit decoding, enumerate valid combinations involving `*` (e.g., `1*` = 9 options for 11-19, `2*` = 6 options for 21-26).

---

## Approach

```text
FUNCTION numDecodings(s):
    MOD ← 10^9 + 7
    prev2 ← 1
    IF s[0] == '*':
        prev1 ← 9
    ELSE IF s[0] == '0':
        prev1 ← 0
    ELSE:
        prev1 ← 1

    FOR i ← 1 TO len(s)-1:
        curr ← 0
        // Single digit
        IF s[i] == '*':
            curr ← curr + 9 * prev1
        ELSE IF s[i] != '0':
            curr ← curr + prev1
        // Two digits
        curr ← curr + twoDigitWays(s[i-1], s[i]) * prev2
        curr ← curr MOD MOD
        prev2 ← prev1
        prev1 ← curr

    RETURN prev1 MOD MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Examples

```
Example 1:
  Input: s = "*"
  Output: 9
  Explanation: The encoded message can represent any of the encoded messages "1", "2", "3", "4", "5", "6", "7", "8", or "9".
  Each of these can be decoded to the strings "A", "B", "C", "D", "E", "F", "G", "H", and "I" respectively.
  Hence, there are a total of 9 ways to decode "*".
```

```
Example 2:
  Input: s = "1*"
  Output: 18
  Explanation: The encoded message can represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19".
  Each of these encoded messages have 2 ways to be decoded (e.g. "11" can be decoded to "AA" or "K").
  Hence, there are a total of 9 * 2 = 18 ways to decode "1*".
```

```
Example 3:
  Input: s = "2*"
  Output: 15
  Explanation: The encoded message can represent any of the encoded messages "21", "22", "23", "24", "25", "26", "27", "28", or "29".
  "21", "22", "23", "24", "25", and "26" have 2 ways of being decoded, but "27", "28", and "29" only have 1 way.
  Hence, there are a total of (6 * 2) + (3 * 1) = 12 + 3 = 15 ways to decode "2*".
```

---

## Walkthrough

Consider the input `"1*"`:

1. Initialize `prev2 = 1`. First character `"1"` gives `prev1 = 1`.
2. At `i = 1` (second character `"*"`):
   - Single‑digit contribution: `9 * prev1 = 9`.
   - Two‑digit contribution: `twoDigitWays('1','*') = 9` (for `11`‑`19`). Multiply by `prev2 = 1` → `9`.
   - `curr = 9 + 9 = 18`; update `prev2 ← 1`, `prev1 ← 18`.
3. End of string, return `18`.

---

## Follow-Up Questions

- How would you adapt the solution if `*` could also represent `0`?
- Can the DP be extended to handle other wildcard patterns, such as `#` representing any digit 0‑9?
- What modifications are needed to output the actual decoded strings instead of just the count?

---

## Key Takeaway

> **Decode Ways II extends the base DP with wildcard case analysis. For each `*`, enumerate valid digit substitutions (1-9 for single, case-by-case for two-digit pairs).**