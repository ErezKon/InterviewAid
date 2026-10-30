# 2266. Count Number of Texts

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-texts
**Companies:** Amazon, Goldman Sachs, Microsoft
---

## Problem Description
Alice is texting Bob using her phone. The **mapping** of digits to letters is the classic phone keypad (`2 → "abc"`, `3 → "def"`, `4 → "ghi"`, `5 → "jkl"`, `6 → "mno"`, `7 → "pqrs"`, `8 → "tuv"`, `9 → "wxyz"`).

In order to **add** a letter, Alice has to **press** the key of the corresponding digit `i` times, where `i` is the position of the letter in the key.

- For example, to add the letter `'s'`, Alice has to press `'7'` four times. Similarly, to add the letter `'k'`, Alice has to press `'5'` twice.
- Note that the digits `'0'` and `'1'` do not map to any letters, so Alice **does not** use them.

However, due to an error in transmission, Bob did not receive Alice's text message but received a **string of pressed keys** instead.

- For example, when Alice sent the message `"bob"`, Bob received the string `"2266622"`.

Given a string `pressedKeys` representing the string received by Bob, return *the **total number of possible text messages** Alice could have sent*.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= pressedKeys.length <= 10^5`
- `pressedKeys` only consists of digits from `'2'` - `'9'`.

## Examples
```
Example 1:
  Input: pressedKeys = "22233"
  Output: 8
  Explanation:
  The possible text messages Alice could have sent are:
  "aaadd", "abdd", "badd", "cdd", "aaae", "abe", "bae", and "ce".
  Since there are 8 possible messages, we return 8.
```

```
Example 2:
  Input: pressedKeys = "222222222222222222222222222222222222"
  Output: 82876089
  Explanation:
  There are 2082876103 possible text messages Alice could have sent.
  Since we need to return the answer modulo 10^9 + 7, we return 2082876103 % (10^9 + 7) = 82876089.
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
