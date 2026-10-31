# 91. Decode Ways

**Difficulty:** 🟡 Medium
**Acceptance:** 35.0%
**LeetCode:** [https://leetcode.com/problems/decode-ways](https://leetcode.com/problems/decode-ways)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Commvault, De Shaw, Flipkart, Goldman Sachs, Google, Graviton, Intuit, Lyft, Meta, Microsoft, Netapp, Oracle, Oscar Health, Snapchat, Tiktok, Uber, Walmart Labs, Zoho

---

## 1. Problem Description

You have intercepted a secret message encoded as a string of numbers. The message is **decoded** via the following mapping:

```
"1" -> 'A'
"2" -> 'B'
...
"25" -> 'Y'
"26" -> 'Z'
```

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes (`"2"` and `"5"` vs `"25"`).

For example, `"11106"` can be decoded into:

- `"AAJF"` with the grouping `(1, 1, 10, 6)`
- `"KJF"` with the grouping `(11, 10, 6)`
- The grouping `(1, 11, 06)` is invalid because `"06"` is not a valid code (only `"6"` is valid).

Note: there may be strings that are impossible to decode.

Given a string `s` containing only digits, return the **number of ways** to **decode** it. If the entire string cannot be decoded in any valid way, return `0`.

The test cases are generated so that the answer fits in a **32-bit** integer.

**Constraints:**

- `1 <= s.length <= 100`
- `s` contains only digits and may contain leading zero(s).

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

```
Example 1:
  Input: s = "12"
  Output: 2
  Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
```

```
Example 2:
  Input: s = "226"
  Output: 3
  Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

```
Example 3:
  Input: s = "06"
  Output: 0
  Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
  In this case, the string is not a valid encoding, so return 0.
```

---

## Walkthrough

Take the input `"226"`:

1. Initialize `prev2 = 1`, `prev1 = 1` (first character `"2"` is valid).
2. `i = 1` (second character `"2"`):
   - Single-digit: `prev1 = 1` → `curr = 1`.
   - Two-digit `22` is within 10-26 → add `prev2 = 1` → `curr = 2`.
   - Update `prev2 ← 1`, `prev1 ← 2`.
3. `i = 2` (third character `"6"`):
   - Single-digit: `curr = prev1 = 2`.
   - Two-digit `26` is valid → add `prev2 = 1` → `curr = 3`.
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
