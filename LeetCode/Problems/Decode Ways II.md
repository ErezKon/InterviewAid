# 639. Decode Ways II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/decode-ways-ii](https://leetcode.com/problems/decode-ways-ii)
**Companies:** Meta, Phonepe

---

## Problem Description

Like Decode Ways, but `*` can represent any digit 1-9. Count decodings modulo `10^9 + 7`.

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

| Input | Output | Explanation |
|---|---|---|
| `"*"` | `9` | `*` can be any digit 1‑9, each forms a valid decoding. |
| `"1*"` | `18` | `1*` can be `11`‑`19` (9 ways) plus `*` as a single digit (9 ways). |
| `"2*"` | `15` | `2*` yields `21`‑`26` (6 ways) plus single `*` (9 ways). |

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