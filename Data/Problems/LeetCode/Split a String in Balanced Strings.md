# 1221. Split a String in Balanced Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-a-string-in-balanced-strings](https://leetcode.com/problems/split-a-string-in-balanced-strings)
**Companies:** Amazon, Google, Meta, Salesforce

---

## Problem Description
Given a string `s` consisting only of the characters `'L'` and `'R'`, split the string into the maximum number of substrings such that each substring contains an equal number of `'L'` and `'R'`. Return the maximum number of balanced substrings that can be obtained.

## Examples
**Example 1:**
```
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: The string can be split into "RL", "RRLL", "RL", "RL". Each substring has the same number of L and R.
```
**Example 2:**
```
Input: s = "RLLLLRRRRL"
Output: 3
Explanation: The split "RL", "LLLRRR", "L" yields three balanced substrings.
```
**Example 3:**
```
Input: s = "LLLLRRRR"
Output: 1
Explanation: The whole string is already balanced.
```

## Approach
The problem can be solved greedily by scanning the string once and maintaining a balance counter. Increase the counter for `'L'` and decrease for `'R'`. Whenever the balance returns to zero, a balanced substring ends, and we increment the answer.

```text
FUNCTION balancedStringSplit(s):
    SET count ← 0
    SET balance ← 0
    FOR c IN s:
        IF c == 'L':
            SET balance ← balance + 1
        ELSE:
            SET balance ← balance - 1
        IF balance == 0:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
| Index | Char | Balance | Action |
|-------|------|---------|--------|
| 0 | R | -1 | balance ≠ 0 |
| 1 | L | 0 | balance == 0 → count = 1 |
| 2 | R | -1 | ... |
| ... | ... | ... | ... |
The table continues until the end of the string, showing each time the balance reaches zero and a new substring is counted.

## Complexity Analysis
- **Time:** O(n), where n is the length of the string, because we scan once.
- **Space:** O(1), only a few integer variables are used.

## Follow-Up Questions
1. How would the solution change if the string could contain other characters?
2. Can you extend the approach to return the actual substrings instead of just the count?
3. What if we need to split the string into the minimum number of balanced substrings?

## Key Takeaway
A single pass with a balance counter greedily identifies the maximum number of balanced substrings.
