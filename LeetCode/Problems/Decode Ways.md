# 91. Decode Ways

**Difficulty:** 🟡 Medium
**Acceptance:** 35.0%
**LeetCode:** [https://leetcode.com/problems/decode-ways](https://leetcode.com/problems/decode-ways)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Commvault, De Shaw, Flipkart, Goldman Sachs, Google, Graviton, Intuit, Lyft, Meta, Microsoft, Netapp, Oracle, Oscar Health, Snapchat, Tiktok, Uber, Walmart Labs, Zoho

---

## 1. Problem Description

Given a string `s` containing only digits, return the number of ways to decode it. `'A'=1, 'B'=2, ..., 'Z'=26`.

---

## 2. Approach: DP — O(n) ✅

```text
FUNCTION numDecodings(s):
    IF s[0] == '0':
        RETURN 0
    prev2 ← 1            // dp[i-2]
    prev1 ← 1            // dp[i-1]
    FOR i ← 1 TO len(s)-1:
        curr ← 0
        // Single digit decode (1-9)
        IF s[i] != '0':
            curr ← curr + prev1
        // Two digit decode (10-26)
        twoDigit ← int(s[i-1..i])
        IF 10 ≤ twoDigit ≤ 26:
            curr ← curr + prev2
        prev2 ← prev1
        prev1 ← curr
    RETURN prev1
```

---

## Examples

| Input | Output | Explanation |
|---|---|---|
| `"12"` | `2` | "12" can be decoded as "AB" (1,2) or "L" (12). |
| `"226"` | `3` | "226" → "BZ" (2,26), "VF" (22,6), "BBF" (2,2,6). |
| `"06"` | `0` | Leading zero makes decoding impossible. |

---

## Walkthrough

Take the input `"226"`:

1. Initialize `prev2 = 1`, `prev1 = 1` (first character `"2"` is valid).
2. `i = 1` (second character `"2"`):
   - Single‑digit: `prev1 = 1` → `curr = 1`.
   - Two‑digit `22` is within 10‑26 → add `prev2 = 1` → `curr = 2`.
   - Update `prev2 ← 1`, `prev1 ← 2`.
3. `i = 2` (third character `"6"`):
   - Single‑digit: `curr = prev1 = 2`.
   - Two‑digit `26` is valid → add `prev2 = 1` → `curr = 3`.
   - Update `prev2 ← 2`, `prev1 ← 3`.
4. End of string, return `prev1 = 3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of the string |
| **Space** | O(1) |

---

## Follow-Up: Decode Ways II (#639)?

`*` can be 1-9. Multiply possibilities at each step. Use modular arithmetic.

---

## Key Takeaway

> Similar to Climbing Stairs but with validity constraints. A `'0'` can only be decoded as part of `10` or `20`. Handle edge cases: leading zeros, invalid pairs.
