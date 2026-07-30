# 2266. Count Number of Texts

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-texts
**Companies:** Amazon, Goldman Sachs, Microsoft
---

## Problem Description
Given a string `pressedKeys` consisting of digits from 2 to 9, each digit maps to a set of letters on a classic phone keypad (e.g., 2 → "abc", 7 → "pqrs"). A user may press a key multiple times to type a letter; however, a key can be pressed at most 4 times consecutively for digits 7 and 9, and at most 3 times for the others. Return the number of possible text messages that could result from the sequence of key presses, modulo 10⁹+7.

## Examples
**Example 1:**
```
Input: pressedKeys = "22233"
Output: 8
Explanation: Possible texts include "aaadd", "aabdd", "abadd", "abbdd", "cadd", "cbd", etc.
```
**Example 2:**
```
Input: pressedKeys = "79"
Output: 4
Explanation: Digit 7 maps to 4 letters, digit 9 maps to 4 letters, each can be typed with a single press.
```

## Approach
Dynamic programming where `dp[i]` is the number of ways to interpret the first `i` characters. For each position `i`, look back up to `maxLen` (3 or 4) characters as long as they are the same digit, and add `dp[i‑j]` to `dp[i]`. Use modulo at each addition.

## Walkthrough
| i | pressedKeys[i‑1] | maxLen | j values considered | dp[i] calculation |
|---|------------------|--------|--------------------|-------------------|
| 1 | 2                | 3      | 1                  | dp[1] = dp[0] = 1 |
| 2 | 2                | 3      | 1,2                | dp[2] = dp[1] + dp[0] = 2 |
| 3 | 2                | 3      | 1,2,3              | dp[3] = dp[2] + dp[1] + dp[0] = 4 |
| 4 | 3                | 3      | 1                  | dp[4] = dp[3] = 4 |
| 5 | 3                | 3      | 1,2                | dp[5] = dp[4] + dp[3] = 8 |
Result `dp[n] = 8`.

## Complexity Analysis
- **Time:** O(n · maxLen) ≤ O(4n) – linear in the length of the input.
- **Space:** O(n) for the DP array (can be reduced to O(1) with rolling variables).

## Follow-Up Questions
- How would you adapt the solution if the maximum consecutive presses for each digit were given as an input array?
- Can the DP be optimized to O(1) space while still handling the modulo operation?
- What changes are needed if the keypad layout is custom (different letters per digit)?

## Key Takeaway
Treat the problem as a variant of “decode ways”: DP over the string, considering only runs of identical digits up to their allowed length.
