# 1221. Split a String in Balanced Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-a-string-in-balanced-strings](https://leetcode.com/problems/split-a-string-in-balanced-strings)
**Companies:** Amazon, Google, Meta, Salesforce

---

## Problem Description

**Balanced** strings are those that have an equal quantity of `'L'` and `'R'` characters.

Given a **balanced** string `s`, split it into some number of substrings such that:

- Each substring is balanced.

Return *the **maximum** number of balanced strings you can obtain.*

**Constraints:**
- `2 <= s.length <= 1000`
- `s[i]` is either `'L'` or `'R'`.
- `s` is a **balanced** string.

## Examples

**Example 1:**
```
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
```

**Example 2:**
```
Input: s = "RLRRRLLRLL"
Output: 2
Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.
```

**Example 3:**
```
Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".
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
