# 2466. Count Ways To Build Good Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-ways-to-build-good-strings](https://leetcode.com/problems/count-ways-to-build-good-strings)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle, Squarepoint Capital

---

## Problem Description

Given the integers `zero`, `one`, `low`, and `high`, we can construct a string by starting with an empty string, and then at each step perform either of the following:

- Append the character `'0'` `zero` times.
- Append the character `'1'` `one` times.

This can be performed any number of times.

A **good** string is a string constructed by the above process having a **length** between `low` and `high` (**inclusive**).

Return *the number of **different** good strings that can be constructed satisfying these properties.* Since the answer can be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= low <= high <= 10^5`
- `1 <= zero, one <= low`

---

## Examples

```
Example 1:
  Input: low = 3, high = 3, zero = 1, one = 1
  Output: 8
  Explanation: One possible valid good string is "011".
  It can be constructed as follows: "" -> "0" -> "01" -> "011".
  All binary strings from "000" to "111" are good strings in this example.
```

```
Example 2:
  Input: low = 2, high = 3, zero = 1, one = 2
  Output: 5
  Explanation: The good strings are "00", "11", "000", "110", and "011".
```

---

## Approach

```
FUNCTION countGoodStrings(low, high, zero, one):
    MOD ← 10^9 + 7
    dp ← ARRAY of size high+1 initialized to 0
    dp[0] ← 1
    FOR i ← 1 TO high:
        IF i ≥ zero:
            dp[i] ← (dp[i] + dp[i - zero]) MOD MOD
        IF i ≥ one:
            dp[i] ← (dp[i] + dp[i - one]) MOD MOD
    result ← SUM(dp[low .. high]) MOD MOD
    RETURN result
```

---

## Walkthrough

Consider **Example 1** (`low=1, high=3, zero=1, one=2`).

| i (length) | dp[i] calculation                               | dp[i] |
|------------|------------------------------------------------|-------|
| 0          | base case                                      | 1     |
| 1          | dp[1] += dp[0] (add a `0`)                     | 1     |
| 2          | dp[2] += dp[1] (add a `0`) → 1
|            | dp[2] += dp[0] (add a `11`) → +1               | 2     |
| 3          | dp[3] += dp[2] (add a `0`) → 2
|            | dp[3] += dp[1] (add a `11`) → +1               | 3     |

Sum `dp[1] + dp[2] + dp[3] = 1 + 2 + 3 = 6`, matching the output.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(high) |
| **Space** | O(high) |

---

## Follow-Up Questions

1. How would you modify the solution if the modulo were not required?
2. Can the problem be solved in O(1) extra space using a sliding‑window technique?
3. What changes are needed if the allowed block sizes are given as an array instead of two fixed values?

---

## Key Takeaway

> **Building strings by appending fixed‑length blocks is analogous to climbing stairs; a simple DP over lengths yields the count, and summing the range `[low, high]` gives the final answer.**